from django.db import models
from django.conf import settings
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

    def __str__(self):
        return f"Réservation #{self.id} - {self.logement.nom} par {self.client.email} ({self.get_statut_display()})"
