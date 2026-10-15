from datetime import timedelta
from decimal import Decimal
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from rest_framework.test import APIClient
from rest_framework import status

from logements.models import Logement
from reservations.models import Reservation
from reservations.services import creer_reservation, verifier_disponibilite

User = get_user_model()


class ReservationCoreValidationTests(TestCase):
    def setUp(self):
        self.host = User.objects.create_user(
            username='host_user',
            email='host@feeltohome.com',
            password='Password123!',
            role=User.Role.PROPRIETAIRE
        )
        self.client1 = User.objects.create_user(
            username='client_one',
            email='client1@example.com',
            password='Password123!',
            role=User.Role.CLIENT
        )
        self.client2 = User.objects.create_user(
            username='client_two',
            email='client2@example.com',
            password='Password123!',
            role=User.Role.CLIENT
        )
        self.villa = Logement.objects.create(
            nom='Villa Kribi Plage',
            type=Logement.TypeLogement.VILLA,
            description='Villa vue océan',
            ville='Kribi',
            prix_par_nuit=Decimal('50000.00'),
            capacite=4,
            proprietaire=self.host
        )

    def test_01_creation_calcul_automatique_prix_total(self):
        """Vérifie le calcul sécurisé du prix total (nombre_nuits * prix_par_nuit)."""
        demain = timezone.now().date() + timedelta(days=1)
        dans_quatre_jours = demain + timedelta(days=3)  # 3 nuits

        reservation = Reservation(
            client=self.client1,
            logement=self.villa,
            date_arrivee=demain,
            date_depart=dans_quatre_jours,
            nombre_personnes=2,
            prix_total=Decimal('1.00')  # Tentative client d'injecter un prix dérisoire
        )
        reservation.save()

        self.assertEqual(reservation.nombre_de_nuits, 3)
        # 3 nuits * 50 000 = 150 000
        self.assertEqual(reservation.prix_total, Decimal('150000.00'))
        self.assertEqual(reservation.statut, Reservation.StatutReservation.EN_ATTENTE)

    def test_02_echec_date_depart_anterieure_ou_egale_arrivee(self):
        """Une date de départ antérieure ou identique à l'arrivée doit être rejetée."""
        demain = timezone.now().date() + timedelta(days=1)

        # Durée nulle (0 nuit)
        res_nulle = Reservation(
            client=self.client1,
            logement=self.villa,
            date_arrivee=demain,
            date_depart=demain,
            nombre_personnes=1,
            prix_total=Decimal('50000.00')
        )
        with self.assertRaises(ValidationError) as ctx:
            res_nulle.save()
        self.assertIn('date_depart', ctx.exception.message_dict)

        # Date négative
        res_negative = Reservation(
            client=self.client1,
            logement=self.villa,
            date_arrivee=demain + timedelta(days=2),
            date_depart=demain,
            nombre_personnes=1,
            prix_total=Decimal('50000.00')
        )
        with self.assertRaises(ValidationError):
            res_negative.save()

    def test_03_echec_date_arrivee_dans_le_passe(self):
        """Une réservation ne peut pas commencer dans le passé."""
        hier = timezone.now().date() - timedelta(days=1)
        demain = timezone.now().date() + timedelta(days=1)

        res_passe = Reservation(
            client=self.client1,
            logement=self.villa,
            date_arrivee=hier,
            date_depart=demain,
            nombre_personnes=1,
            prix_total=Decimal('50000.00')
        )
        with self.assertRaises(ValidationError) as ctx:
            res_passe.save()
        self.assertIn('date_arrivee', ctx.exception.message_dict)

    def test_04_echec_capacite_depassee(self):
        """Le nombre de voyageurs ne peut pas excéder la capacité du logement."""
        demain = timezone.now().date() + timedelta(days=1)
        apres_demain = demain + timedelta(days=1)

        res_surcapacite = Reservation(
            client=self.client1,
            logement=self.villa,
            date_arrivee=demain,
            date_depart=apres_demain,
            nombre_personnes=10,  # Capacité max = 4
            prix_total=Decimal('50000.00')
        )
        with self.assertRaises(ValidationError) as ctx:
            res_surcapacite.save()
        self.assertIn('nombre_personnes', ctx.exception.message_dict)

    def test_05_blocage_chevauchement_dates_identique_logement(self):
        """Deux réservations actives ne peuvent pas chevaucher leurs dates sur le même bien."""
        demain = timezone.now().date() + timedelta(days=1)
        jour_5 = demain + timedelta(days=4)

        # 1ère réservation : jours 1 à 5
        res1 = creer_reservation(
            client=self.client1,
            logement=self.villa,
            date_arrivee=demain,
            date_depart=jour_5,
            nombre_personnes=2
        )
        self.assertIsNotNone(res1.id)

        # 2ème réservation tentant de réserver les jours 2 à 4 (chevauchement intérieur)
        with self.assertRaises(ValidationError) as ctx:
            creer_reservation(
                client=self.client2,
                logement=self.villa,
                date_arrivee=demain + timedelta(days=1),
                date_depart=demain + timedelta(days=3),
                nombre_personnes=1
            )
        self.assertIn("n'est pas disponible", str(ctx.exception))

    def test_06_autoriser_reservation_dates_distinctes(self):
        """Une réservation commençant le jour du départ de la précédente est acceptée."""
        demain = timezone.now().date() + timedelta(days=1)
        jour_3 = demain + timedelta(days=2)
        jour_5 = demain + timedelta(days=4)

        res1 = creer_reservation(self.client1, self.villa, demain, jour_3, 1)
        res2 = creer_reservation(self.client2, self.villa, jour_3, jour_5, 1)

        self.assertIsNotNone(res1.id)
        self.assertIsNotNone(res2.id)

    def test_07_reservation_annulee_libere_les_dates(self):
        """Si une réservation est annulée, ses dates redeviennent disponibles."""
        demain = timezone.now().date() + timedelta(days=1)
        jour_3 = demain + timedelta(days=2)

        res1 = creer_reservation(self.client1, self.villa, demain, jour_3, 1)
        res1.annuler(self.client1)
        self.assertEqual(res1.statut, Reservation.StatutReservation.ANNULEE)

        # La nouvelle réservation pour les mêmes dates doit maintenant réussir
        res2 = creer_reservation(self.client2, self.villa, demain, jour_3, 1)
        self.assertIsNotNone(res2.id)

    def test_08_permissions_transitions_statut(self):
        """Vérifie que seul l'hôte peut confirmer, et que le client peut annuler."""
        demain = timezone.now().date() + timedelta(days=1)
        jour_3 = demain + timedelta(days=2)

        res = creer_reservation(self.client1, self.villa, demain, jour_3, 1)

        # Le client ne peut pas confirmer lui-même sa réservation
        self.assertFalse(res.peut_etre_confirmee_par(self.client1))
        with self.assertRaises(ValidationError):
            res.confirmer(self.client1)

        # Le propriétaire du bien peut confirmer
        self.assertTrue(res.peut_etre_confirmee_par(self.host))
        res.confirmer(self.host)
        self.assertEqual(res.statut, Reservation.StatutReservation.CONFIRMEE)

        # Le client peut annuler une réservation confirmée
        self.assertTrue(res.peut_etre_annulee_par(self.client1))
        res.annuler(self.client1)
        self.assertEqual(res.statut, Reservation.StatutReservation.ANNULEE)


class ReservationAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.host = User.objects.create_user(
            username='host_api',
            email='host_api@feeltohome.com',
            password='Password123!',
            role=User.Role.PROPRIETAIRE
        )
        self.client_user = User.objects.create_user(
            username='traveler',
            email='traveler@feeltohome.com',
            password='Password123!',
            role=User.Role.CLIENT
        )
        self.other_user = User.objects.create_user(
            username='other_traveler',
            email='other@feeltohome.com',
            password='Password123!',
            role=User.Role.CLIENT
        )
        self.studio = Logement.objects.create(
            nom='Studio Akwa Douala',
            type=Logement.TypeLogement.STUDIO,
            description='Studio propre à Akwa',
            ville='Douala',
            prix_par_nuit=Decimal('30000.00'),
            capacite=2,
            proprietaire=self.host
        )

    def test_api_disponibilite_publique(self):
        """Endpoint public de vérification de disponibilité."""
        demain = (timezone.now().date() + timedelta(days=1)).isoformat()
        jour_4 = (timezone.now().date() + timedelta(days=4)).isoformat()

        url = f"{reverse('reservation-disponibilite')}?logement_id={self.studio.id}&date_arrivee={demain}&date_depart={jour_4}"
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['disponible'])
        self.assertEqual(response.data['nombre_nuits'], 3)
        self.assertEqual(response.data['prix_total'], '90000.00')

    def test_api_creation_requiert_authentification(self):
        """Un utilisateur anonyme ne peut pas créer de réservation via l'API (HTTP 401 ou 403)."""
        url = reverse('reservation-list-create')
        payload = {
            'logement_id': self.studio.id,
            'date_arrivee': (timezone.now().date() + timedelta(days=2)).isoformat(),
            'date_depart': (timezone.now().date() + timedelta(days=5)).isoformat(),
            'nombre_personnes': 2
        }
        response = self.client.post(url, payload)
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_api_creation_reussie_utilisateur_authentifie(self):
        """Un client connecté crée une réservation ; le prix total est calculé par le serveur."""
        self.client.force_authenticate(user=self.client_user)

        demain = timezone.now().date() + timedelta(days=2)
        jour_4 = demain + timedelta(days=2)  # 2 nuits

        url = reverse('reservation-list-create')
        payload = {
            'logement_id': self.studio.id,
            'date_arrivee': demain.isoformat(),
            'date_depart': jour_4.isoformat(),
            'nombre_personnes': 2,
            'prix_total': '999.00'  # Doit être ignoré par le sérialiseur
        }
        response = self.client.post(url, payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # 2 nuits * 30 000 = 60 000
        self.assertEqual(Decimal(str(response.data['prix_total'])), Decimal('60000.00'))
        self.assertEqual(response.data['statut'], 'EN_ATTENTE')

    def test_api_isolation_des_listes_clients(self):
        """Un client ne doit voir dans la liste que ses propres réservations."""
        demain = timezone.now().date() + timedelta(days=1)
        jour_3 = demain + timedelta(days=2)

        # Réservation client 1
        creer_reservation(self.client_user, self.studio, demain, jour_3, 1)

        # Client 2 se connecte et consulte la liste
        self.client.force_authenticate(user=self.other_user)
        url = reverse('reservation-list-create')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertEqual(len(results), 0)
