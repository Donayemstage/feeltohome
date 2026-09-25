from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    class Role(models.TextChoices):
        CLIENT = 'CLIENT', 'Client'
        PROPRIETAIRE = 'PROPRIETAIRE', 'Propriétaire'
        ADMIN = 'ADMIN', 'Administrateur'

    class Statut(models.TextChoices):
        ACTIF = 'ACTIF', 'Actif'
        INACTIF = 'INACTIF', 'Inactif'
        SUSPENDU = 'SUSPENDU', 'Suspendu'

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.CLIENT,
        help_text="Rôle applicatif utilisateur (CLIENT, PROPRIETAIRE, ADMIN)"
    )
    telephone = models.CharField(max_length=30, blank=True, default='')
    statut = models.CharField(
        max_length=20,
        choices=Statut.choices,
        default=Statut.ACTIF
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def nom(self):
        return self.last_name

    @nom.setter
    def nom(self, value):
        self.last_name = value

    @property
    def prenom(self):
        return self.first_name

    @prenom.setter
    def prenom(self, value):
        self.first_name = value

    def __str__(self):
        full_name = f"{self.first_name} {self.last_name}".strip()
        display = full_name if full_name else self.username
        return f"{display} ({self.role})"
