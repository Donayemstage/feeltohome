from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from logements.models import Logement, PhotoLogement, Equipement

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds database with initial demo equipments and housing listings'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding demo data...')

        # 1. Host user
        host, created = User.objects.get_or_create(
            username='demo_host',
            defaults={
                'email': 'hote.demo@feeltohome.com',
                'first_name': 'Samuel',
                'last_name': 'Eto',
                'role': User.Role.PROPRIETAIRE,
                'telephone': '+237699001122'
            }
        )
        if created:
            host.set_password('FeelToHome2026!')
            host.save()

        # 2. Equipments
        equipments_data = [
            ('WiFi', 'wifi'),
            ('Piscine', 'waves'),
            ('Parking', 'car'),
            ('Climatisation', 'snowflake'),
            ('Télévision', 'tv'),
            ('Cuisine', 'utensils'),
            ('Balcon', 'sun'),
            ('Groupe électrogène', 'zap'),
            ('Sécurité 24/7', 'shield-check'),
            ('Eau chaude', 'flame'),
            ('Lave-linge', 'shirt'),
        ]

        equip_objects = {}
        for name, icon in equipments_data:
            eq, _ = Equipement.objects.get_or_create(nom=name, defaults={'icon_name': icon})
            equip_objects[name] = eq

        # 3. Demo Listings
        demos = [
            {
                'nom': 'Hôtel Premium Akwa',
                'slug': 'hotel-premium-akwa-douala',
                'type': Logement.TypeLogement.HOTEL,
                'description': 'Hôtel luxueux au cœur du quartier d\'affaires Akwa à Douala. Chambres climatisées, service de chambre 24/7 et groupe électrogène automatique.',
                'ville': 'Douala',
                'quartier': 'Akwa',
                'adresse': 'Boulevard de la Liberté',
                'prix_par_nuit': 45000,
                'capacite': 2,
                'nombre_chambres': 1,
                'nombre_lits': 1,
                'nombre_salles_bain': 1,
                'equipements': ['WiFi', 'Climatisation', 'Télévision', 'Groupe électrogène', 'Sécurité 24/7'],
                'photos': [
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
                ]
            },
            {
                'nom': 'Appartement Moderne Bonamoussadi',
                'slug': 'appartement-moderne-bonamoussadi-douala',
                'type': Logement.TypeLogement.APPARTEMENT,
                'description': 'Appartement d meublé 3 pièces haut standing, idéal pour séjours professionnels ou en famille à Douala. Cuisine hyper équipée et balcon.',
                'ville': 'Douala',
                'quartier': 'Bonamoussadi',
                'adresse': 'Carrefour Sable',
                'prix_par_nuit': 35000,
                'capacite': 4,
                'nombre_chambres': 2,
                'nombre_lits': 2,
                'nombre_salles_bain': 2,
                'equipements': ['WiFi', 'Climatisation', 'Cuisine', 'Télévision', 'Balcon', 'Parking'],
                'photos': [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
                ]
            },
            {
                'nom': 'Studio Confort Bastos',
                'slug': 'studio-confort-bastos-yaounde',
                'type': Logement.TypeLogement.STUDIO,
                'description': 'Charmant studio indépendant et sécurisé dans le quartier diplomatique de Bastos à Yaoundé. Calme, propre et fonctionnel.',
                'ville': 'Yaoundé',
                'quartier': 'Bastos',
                'adresse': 'Avenue Winston Churchill',
                'prix_par_nuit': 22000,
                'capacite': 2,
                'nombre_chambres': 1,
                'nombre_lits': 1,
                'nombre_salles_bain': 1,
                'equipements': ['WiFi', 'Climatisation', 'Télévision', 'Cuisine', 'Sécurité 24/7'],
                'photos': [
                    'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80'
                ]
            },
            {
                'nom': 'Villa Émeraude avec Piscine',
                'slug': 'villa-emeraude-piscine-kribi',
                'type': Logement.TypeLogement.VILLA,
                'description': 'Superbe villa vue mer à Kribi avec piscine privée, jardin tropical et accès direct à la plage. Idéale pour les grandes vacances et événements VIP.',
                'ville': 'Kribi',
                'quartier': 'Bord de mer',
                'adresse': 'Route des Chutes de la Lobé',
                'prix_par_nuit': 120000,
                'capacite': 8,
                'nombre_chambres': 4,
                'nombre_lits': 4,
                'nombre_salles_bain': 4,
                'equipements': ['WiFi', 'Piscine', 'Climatisation', 'Cuisine', 'Parking', 'Groupe électrogène', 'Sécurité 24/7'],
                'photos': [
                    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
                ]
            },
            {
                'nom': 'Résidence Prestige Bonapriso',
                'slug': 'residence-prestige-bonapriso-douala',
                'type': Logement.TypeLogement.RESIDENCE,
                'description': 'Résidence hôtelière haut de gamme à Bonapriso, Douala. Sécurité renforcée, ascenseur, conciergerie et parking sous-sol.',
                'ville': 'Douala',
                'quartier': 'Bonapriso',
                'adresse': 'Rue Njo-Njo',
                'prix_par_nuit': 55000,
                'capacite': 4,
                'nombre_chambres': 2,
                'nombre_lits': 2,
                'nombre_salles_bain': 2,
                'equipements': ['WiFi', 'Climatisation', 'Télévision', 'Groupe électrogène', 'Parking', 'Sécurité 24/7'],
                'photos': [
                    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
                ]
            },
            {
                'nom': 'Auberge Horizon Limbe',
                'slug': 'auberge-horizon-limbe',
                'type': Logement.TypeLogement.AUBERGE,
                'description': 'Auberge chaleureuse au bord du volcan et des plages de sable noir de Limbe. Accueil convivial, idéal pour les voyageurs et touristes.',
                'ville': 'Limbe',
                'quartier': 'Down Beach',
                'adresse': 'Beach Road',
                'prix_par_nuit': 15000,
                'capacite': 2,
                'nombre_chambres': 1,
                'nombre_lits': 1,
                'nombre_salles_bain': 1,
                'equipements': ['WiFi', 'Parking', 'Sécurité 24/7', 'Eau chaude'],
                'photos': [
                    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80'
                ]
            }
        ]

        for item in demos:
            eq_names = item.pop('equipements')
            photos = item.pop('photos')
            logement, _ = Logement.objects.get_or_create(
                slug=item['slug'],
                defaults={**item, 'proprietaire': host}
            )

            for eq_n in eq_names:
                if eq_n in equip_objects:
                    logement.equipements.add(equip_objects[eq_n])

            for idx, photo_url in enumerate(photos):
                PhotoLogement.objects.get_or_create(
                    logement=logement,
                    image_url=photo_url,
                    defaults={'ordre': idx, 'image_principale': (idx == 0)}
                )

        self.stdout.write(self.style.SUCCESS('Successfully seeded demo data!'))
