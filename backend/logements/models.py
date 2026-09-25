from django.db import models
from django.conf import settings
from django.utils.text import slugify

class Equipement(models.Model):
    nom = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    icon_name = models.CharField(max_length=50, blank=True, default='')

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nom)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nom


class Logement(models.Model):
    class TypeLogement(models.TextChoices):
        HOTEL = 'HOTEL', 'Hôtel'
        APPARTEMENT = 'APPARTEMENT', 'Appartement meublé'
        STUDIO = 'STUDIO', 'Studio'
        RESIDENCE = 'RESIDENCE', 'Résidence'
        VILLA = 'VILLA', 'Villa'
        AUBERGE = 'AUBERGE', 'Auberge'

    class StatutLogement(models.TextChoices):
        DISPONIBLE = 'DISPONIBLE', 'Disponible'
        OCCUPE = 'OCCUPE', 'Occupé'
        EN_MAINTENANCE = 'EN_MAINTENANCE', 'En maintenance'
        MASQUE = 'MASQUE', 'Masqué'

    nom = models.CharField(max_length=255)
    slug = models.SlugField(max_length=280, unique=True, blank=True)
    type = models.CharField(max_length=30, choices=TypeLogement.choices)
    description = models.TextField()
    ville = models.CharField(max_length=100)
    quartier = models.CharField(max_length=100, blank=True, default='')
    adresse = models.CharField(max_length=255, blank=True, default='')
    prix_par_nuit = models.DecimalField(max_digits=12, decimal_places=2)
    devise = models.CharField(max_length=10, default='FCFA')
    capacite = models.PositiveIntegerField(default=1)
    nombre_chambres = models.PositiveIntegerField(default=1)
    nombre_lits = models.PositiveIntegerField(default=1)
    nombre_salles_bain = models.PositiveIntegerField(default=1)
    statut = models.CharField(
        max_length=25,
        choices=StatutLogement.choices,
        default=StatutLogement.DISPONIBLE
    )
    proprietaire = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='logements'
    )
    equipements = models.ManyToManyField(Equipement, blank=True, related_name='logements')
    
    # Pre-architected future fields
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    politique_annulation = models.TextField(blank=True, default='')
    heure_arrivee = models.TimeField(null=True, blank=True)
    heure_depart = models.TimeField(null=True, blank=True)
    regles = models.TextField(blank=True, default='')

    date_creation = models.DateTimeField(auto_now_add=True)
    date_modification = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date_creation']

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(f"{self.nom}-{self.ville}")
            self.slug = base_slug
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.nom} ({self.get_type_display()}) - {self.ville}"


class PhotoLogement(models.Model):
    logement = models.ForeignKey(Logement, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='logements/photos/', blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, default='', help_text="URL externe/démo")
    ordre = models.PositiveIntegerField(default=0)
    image_principale = models.BooleanField(default=False)

    class Meta:
        ordering = ['ordre', 'id']

    def get_url(self):
        if self.image:
            return self.image.url
        return self.image_url

    def __str__(self):
        return f"Photo de {self.logement.nom} (Ordre: {self.ordre})"
