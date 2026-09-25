from rest_framework import serializers
from .models import Logement, PhotoLogement, Equipement

class EquipementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipement
        fields = ['id', 'nom', 'slug', 'icon_name']


class PhotoLogementSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = PhotoLogement
        fields = ['id', 'url', 'ordre', 'image_principale']

    def get_url(self, obj):
        return obj.get_url()


class LogementSerializer(serializers.ModelSerializer):
    equipements = EquipementSerializer(many=True, read_only=True)
    photos = PhotoLogementSerializer(many=True, read_only=True)
    type_display = serializers.CharField(source='get_type_display', read_only=True)

    class Meta:
        model = Logement
        fields = [
            'id', 'nom', 'slug', 'type', 'type_display', 'description',
            'ville', 'quartier', 'adresse', 'prix_par_nuit', 'devise',
            'capacite', 'nombre_chambres', 'nombre_lits', 'nombre_salles_bain',
            'statut', 'equipements', 'photos', 'date_creation'
        ]
