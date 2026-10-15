from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.utils import timezone
from logements.models import Logement


class Reservation(models.Model):
    class StatutReservation(models.TextChoices):
        EN_ATTENTE = 'EN_ATTENTE', 'En attente'
        CONFIRMEE = 'CONFIRMEE', 'Confirmée'
        REFUSEE = 'REFUSEE', 'Refusée'
        ANNULEE = 'ANNULEE', 'Annulée'
        TERMINEE = 'TERMINEE', 'Terminée'

    logement = models.ForeignKey(Logement, on_delete=models.CASCADE, related_name='reservations')
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reservations')
    date_arrivee = models.DateField()
    date_depart = models.DateField()
    nombre_personnes = models.PositiveIntegerField(default=1)
    prix_total = models.DecimalField(max_digits=12, decimal_places=2)
    statut = models.CharField(
        max_length=20,
        choices=StatutReservation.choices,
        default=StatutReservation.EN_ATTENTE
    )
    date_creation = models.DateTimeField(auto_now_add=True)
    date_modification = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date_creation']

    @property
    def nombre_de_nuits(self):
        """Nombre de nuits calculé à partir des dates de séjour."""
        if self.date_arrivee and self.date_depart:
            return max(0, (self.date_depart - self.date_arrivee).days)
        return 0

    def clean(self):
        super().clean()
        errors = {}

        # 1. Validation de l'ordre et cohérence des dates
        if self.date_arrivee and self.date_depart:
            if self.date_depart <= self.date_arrivee:
                errors['date_depart'] = "La date de départ doit être strictement postérieure à la date d'arrivée (minimum 1 nuit)."
            elif not self.pk and self.date_arrivee < timezone.now().date():
                errors['date_arrivee'] = "La date d'arrivée ne peut pas être située dans le passé."

        # 2. Validation de la capacité d'accueil
        if self.nombre_personnes is not None:
            if self.nombre_personnes < 1:
                errors['nombre_personnes'] = "Le nombre de personnes doit être d'au moins 1."
            elif hasattr(self, 'logement') and self.logement_id:
                try:
                    capacite_max = self.logement.capacite
                    if self.nombre_personnes > capacite_max:
                        errors['nombre_personnes'] = (
                            f"Le nombre de voyageurs ({self.nombre_personnes}) dépasse la capacité maximale du logement ({capacite_max} personnes)."
                        )
                except Logement.DoesNotExist:
                    pass

        # 3. Calcul sécurisé du prix total côté serveur (ne jamais se fier au client)
        if hasattr(self, 'logement') and self.logement_id and self.date_arrivee and self.date_depart:
            if self.date_depart > self.date_arrivee:
                nuits = (self.date_depart - self.date_arrivee).days
                self.prix_total = self.logement.prix_par_nuit * nuits

        # 4. Détection et blocage des réservations concurrentes / chevauchements
        if (
            hasattr(self, 'logement')
            and self.logement_id
            and self.date_arrivee
            and self.date_depart
            and self.date_depart > self.date_arrivee
            and self.statut in [self.StatutReservation.EN_ATTENTE, self.StatutReservation.CONFIRMEE]
        ):
            conflits = Reservation.objects.filter(
                logement_id=self.logement_id,
                statut__in=[self.StatutReservation.EN_ATTENTE, self.StatutReservation.CONFIRMEE],
                date_arrivee__lt=self.date_depart,
                date_depart__gt=self.date_arrivee,
            )
            if self.pk:
                conflits = conflits.exclude(pk=self.pk)

            if conflits.exists():
                errors['date_arrivee'] = "Ce logement n'est pas disponible pour ces dates (réservation déjà confirmée ou en attente)."

        if errors:
            raise ValidationError(errors)

    def save(self, *args, **kwargs):
        # Toujours exécuter la validation métier avant persistance
        self.full_clean()
        super().save(*args, **kwargs)

    # --- Règles de transitions d'état et permissions métier ---

    def peut_etre_annulee_par(self, user):
        """Vérifie si un utilisateur a le droit d'annuler cette réservation."""
        if not user or not user.is_authenticated:
            return False
        is_client = self.client_id == user.id
        is_host = hasattr(self.logement, 'proprietaire_id') and self.logement.proprietaire_id == user.id
        is_admin = user.is_staff or getattr(user, 'role', '') == 'ADMIN'
        is_active_status = self.statut in [self.StatutReservation.EN_ATTENTE, self.StatutReservation.CONFIRMEE]
        return (is_client or is_host or is_admin) and is_active_status

    def annuler(self, user):
        """Annule la réservation avec vérification de permission."""
        if not self.peut_etre_annulee_par(user):
            raise ValidationError("Vous n'avez pas l'autorisation d'annuler cette réservation ou son statut ne le permet pas.")
        self.statut = self.StatutReservation.ANNULEE
        super().save(update_fields=['statut', 'date_modification'])

    def peut_etre_confirmee_par(self, user):
        """Seul le propriétaire du logement ou un administrateur peut confirmer une réservation en attente."""
        if not user or not user.is_authenticated:
            return False
        is_host = hasattr(self.logement, 'proprietaire_id') and self.logement.proprietaire_id == user.id
        is_admin = user.is_staff or getattr(user, 'role', '') == 'ADMIN'
        return (is_host or is_admin) and self.statut == self.StatutReservation.EN_ATTENTE

    def confirmer(self, user):
        """Confirme une réservation en attente."""
        if not self.peut_etre_confirmee_par(user):
            raise ValidationError("Seul le propriétaire ou un administrateur peut confirmer cette réservation.")
        self.statut = self.StatutReservation.CONFIRMEE
        super().save(update_fields=['statut', 'date_modification'])

    def refuser(self, user):
        """Refuse une réservation en attente."""
        if not self.peut_etre_confirmee_par(user):
            raise ValidationError("Seul le propriétaire ou un administrateur peut refuser cette réservation.")
        self.statut = self.StatutReservation.REFUSEE
        super().save(update_fields=['statut', 'date_modification'])

    def __str__(self):
        return f"Réservation #{self.id} - {self.logement.nom} par {self.client.email} ({self.get_statut_display()})"
