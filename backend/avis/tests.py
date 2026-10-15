from datetime import timedelta
from decimal import Decimal
from django.test import TestCase
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

from logements.models import Logement
from reservations.models import Reservation
from avis.models import Avis

User = get_user_model()


class AvisValidationTests(TestCase):
    def setUp(self):
        self.host = User.objects.create_user(
            username='host_avis',
            email='host_avis@feeltohome.com',
            password='Password123!',
            role=User.Role.PROPRIETAIRE
        )
        self.traveler = User.objects.create_user(
            username='traveler_avis',
            email='traveler_avis@feeltohome.com',
            password='Password123!',
            role=User.Role.CLIENT
        )
        self.non_guest = User.objects.create_user(
            username='intruder',
            email='intruder@feeltohome.com',
            password='Password123!',
            role=User.Role.CLIENT
        )
        self.appartement = Logement.objects.create(
            nom='Appartement Bonapriso',
            type=Logement.TypeLogement.APPARTEMENT,
            description='Bel appartement standing',
            ville='Douala',
            prix_par_nuit=Decimal('40000.00'),
            capacite=3,
            proprietaire=self.host
        )

    def test_01_rejet_avis_sans_sejour_verifie(self):
        """Un utilisateur n'ayant jamais séjourné dans le logement ne peut pas déposer d'avis."""
        avis = Avis(
            logement=self.appartement,
            client=self.non_guest,
            note=5,
            commentaire='Superbe endroit imaginaire !'
        )
        with self.assertRaises(ValidationError) as ctx:
            avis.save()
        self.assertIn('client', ctx.exception.message_dict)

    def test_02_succes_avis_avec_sejour_confirme(self):
        """Un client ayant une réservation confirmée ou terminée peut déposer un avis valide."""
        demain = timezone.now().date() + timedelta(days=1)
        # Création directe de la réservation confirmée
        Reservation.objects.create(
            client=self.traveler,
            logement=self.appartement,
            date_arrivee=demain,
            date_depart=demain + timedelta(days=2),
            nombre_personnes=2,
            prix_total=Decimal('80000.00'),
            statut=Reservation.StatutReservation.CONFIRMEE
        )

        avis = Avis(
            logement=self.appartement,
            client=self.traveler,
            note=5,
            commentaire='Séjour impeccable, hôte très accueillant !'
        )
        avis.save()
        self.assertIsNotNone(avis.id)
        self.assertEqual(avis.note, 5)

    def test_03_rejet_note_hors_bornes(self):
        """La note d'un avis doit impérativement être comprise entre 1 et 5."""
        demain = timezone.now().date() + timedelta(days=1)
        Reservation.objects.create(
            client=self.traveler,
            logement=self.appartement,
            date_arrivee=demain,
            date_depart=demain + timedelta(days=2),
            nombre_personnes=1,
            prix_total=Decimal('80000.00'),
            statut=Reservation.StatutReservation.TERMINEE
        )

        # Note = 0 (inférieure à 1)
        avis_zero = Avis(
            logement=self.appartement,
            client=self.traveler,
            note=0,
            commentaire='Mauvais'
        )
        with self.assertRaises(ValidationError):
            avis_zero.save()

        # Note = 6 (supérieure à 5)
        avis_six = Avis(
            logement=self.appartement,
            client=self.traveler,
            note=6,
            commentaire='Trop bien'
        )
        with self.assertRaises(ValidationError):
            avis_six.save()
