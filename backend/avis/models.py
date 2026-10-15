from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError
from logements.models import Logement


class Avis(models.Model):
    logement = models.ForeignKey(Logement, on_delete=models.CASCADE, related_name='avis')
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='avis')
    note = models.PositiveSmallIntegerField(
        default=5,
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="Note sur 5 (de 1 à 5)"
    )
    commentaire = models.TextField(blank=True, default='')
    date_creation = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Avis'
        ordering = ['-date_creation']

    @classmethod
    def client_a_sejourne(cls, client, logement):
        """Vérifie si le client possède un séjour confirmé ou terminé pour ce logement."""
        from reservations.models import Reservation
        return Reservation.objects.filter(
            client=client,
            logement=logement,
            statut__in=[Reservation.StatutReservation.CONFIRMEE, Reservation.StatutReservation.TERMINEE]
        ).exists()

    def clean(self):
        super().clean()
        if self.note is not None and (self.note < 1 or self.note > 5):
            raise ValidationError({'note': "La note doit être comprise entre 1 et 5."})

        # Vérification d'authenticité de l'avis : le client doit avoir réservé le logement
        if self.client_id and self.logement_id:
            if not self.client_a_sejourne(self.client, self.logement):
                raise ValidationError({
                    'client': "Vous ne pouvez déposer un avis que pour un logement dans lequel vous avez effectué un séjour confirmé ou terminé."
                })

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Avis {self.note}/5 sur {self.logement.nom} par {self.client.email}"
