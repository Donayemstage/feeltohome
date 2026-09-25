from django.db import models
from django.conf import settings
from logements.models import Logement

class Avis(models.Model):
    logement = models.ForeignKey(Logement, on_delete=models.CASCADE, related_name='avis')
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='avis')
    note = models.PositiveSmallIntegerField(default=5)
    commentaire = models.TextField(blank=True, default='')
    date_creation = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Avis'
        ordering = ['-date_creation']

    def __str__(self):
        return f"Avis {self.note}/5 sur {self.logement.nom} par {self.client.email}"
