from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import Logement, Equipement, PhotoLogement

User = get_user_model()

class Phase1LogementAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.host = User.objects.create_user(
            username='host_test',
            email='host@feeltohome.com',
            password='Password123!',
            role=User.Role.PROPRIETAIRE
        )
        self.wifi = Equipement.objects.create(nom='WiFi', slug='wifi', icon_name='wifi')
        self.pool = Equipement.objects.create(nom='Piscine', slug='piscine', icon_name='waves')

        # Listing 1: Villa in Kribi (120,000 XAF)
        self.villa = Logement.objects.create(
            nom='Villa Émeraude',
            type=Logement.TypeLogement.VILLA,
            description='Superbe villa vue mer',
            ville='Kribi',
            quartier='Bord de mer',
            prix_par_nuit=120000,
            proprietaire=self.host
        )
        self.villa.equipements.add(self.wifi, self.pool)
        PhotoLogement.objects.create(logement=self.villa, image_url='https://example.com/villa.jpg', image_principale=True)

        # Listing 2: Studio in Douala (25,000 XAF)
        self.studio = Logement.objects.create(
            nom='Studio Akwa',
            type=Logement.TypeLogement.STUDIO,
            description='Studio propre au centre d\'affaires',
            ville='Douala',
            quartier='Akwa',
            prix_par_nuit=25000,
            proprietaire=self.host
        )
        self.studio.equipements.add(self.wifi)

    def test_a_list_logements(self):
        url = reverse('logement-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertGreaterEqual(len(results), 2)

    def test_b_filter_by_ville(self):
        url = reverse('logement-list') + '?ville=Kribi'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['nom'], 'Villa Émeraude')

    def test_c_filter_by_type(self):
        url = reverse('logement-list') + '?type=VILLA'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['type'], 'VILLA')

    def test_d_filter_by_price_bounds(self):
        url = reverse('logement-list') + '?prix_min=20000&prix_max=30000'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['nom'], 'Studio Akwa')

    def test_e_combination_filters(self):
        url = reverse('logement-list') + '?ville=Kribi&type=VILLA&prix_min=100000'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data['results'] if 'results' in response.data else response.data
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['nom'], 'Villa Émeraude')

    def test_f_valid_slug_detail(self):
        url = reverse('logement-detail', kwargs={'slug': self.villa.slug})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nom'], 'Villa Émeraude')

    def test_g_invalid_slug_returns_404(self):
        url = reverse('logement-detail', kwargs={'slug': 'slug-qui-n-existe-pas'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
