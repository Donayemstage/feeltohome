from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import Logement, Equipement, PhotoLogement

User = get_user_model()

class LogementAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.host = User.objects.create_user(
            username='host1',
            email='host1@example.com',
            password='Password123!',
            role=User.Role.PROPRIETAIRE
        )
        self.equipement = Equipement.objects.create(nom='WiFi', icon_name='wifi')
        self.logement = Logement.objects.create(
            nom='Studio Bonapriso',
            type=Logement.TypeLogement.STUDIO,
            description='Un beau studio',
            ville='Douala',
            quartier='Bonapriso',
            prix_par_nuit=25000,
            proprietaire=self.host
        )
        self.logement.equipements.add(self.equipement)
        PhotoLogement.objects.create(
            logement=self.logement,
            image_url='https://images.unsplash.com/photo-1554995207-c18c203602cb',
            image_principale=True
        )

    def test_health_check_endpoint(self):
        url = reverse('health-check')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'PASS')

    def test_list_logements_endpoint(self):
        url = reverse('logement-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('results' in response.data or len(response.data) > 0)

    def test_detail_logement_endpoint(self):
        url = reverse('logement-detail', kwargs={'slug': self.logement.slug})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nom'], 'Studio Bonapriso')
