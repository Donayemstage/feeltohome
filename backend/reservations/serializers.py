from rest_framework import serializers
from django.core.exceptions import ValidationError as DjangoValidationError
from logements.models import Logement
from .models import Reservation
from .services import creer_reservation


class ReservationSerializer(serializers.ModelSerializer):
    """
    Sérialiseur de lecture pour les réservations.
    Affiche les détails complets tout en protégeant les données sensibles.
    """
    statut_display = serializers.CharField(source='get_statut_display', read_only=True)
    nombre_de_nuits = serializers.IntegerField(read_only=True)
    logement_nom = serializers.CharField(source='logement.nom', read_only=True)
    logement_slug = serializers.CharField(source='logement.slug', read_only=True)
    logement_ville = serializers.CharField(source='logement.ville', read_only=True)
    client_email = serializers.EmailField(source='client.email', read_only=True)
    client_nom_complet = serializers.SerializerMethodField()

    class Meta:
        model = Reservation
        fields = [
            'id',
            'logement',
            'logement_nom',
            'logement_slug',
            'logement_ville',
            'client',
            'client_email',
            'client_nom_complet',
            'date_arrivee',
            'date_depart',
            'nombre_de_nuits',
            'nombre_personnes',
            'prix_total',
            'statut',
            'statut_display',
            'date_creation',
            'date_modification',
        ]
        read_only_fields = [
            'id',
            'client',
            'prix_total',
            'statut',
            'date_creation',
            'date_modification',
        ]

    def get_client_nom_complet(self, obj):
        full_name = f"{obj.client.first_name} {obj.client.last_name}".strip()
        return full_name if full_name else obj.client.username


class ReservationCreateSerializer(serializers.Serializer):
    """
    Sérialiseur d'écriture pour créer une réservation.
    Le client ne peut JAMAIS injecter son propre prix_total ni son propre statut.
    """
    logement_id = serializers.IntegerField()
    date_arrivee = serializers.DateField()
    date_depart = serializers.DateField()
    nombre_personnes = serializers.IntegerField(default=1, min_value=1)

    def validate_logement_id(self, value):
        try:
            return Logement.objects.get(id=value)
        except Logement.DoesNotExist:
            raise serializers.ValidationError("Logement introuvable.")

    def validate(self, attrs):
        logement = attrs['logement_id']
        date_arrivee = attrs['date_arrivee']
        date_depart = attrs['date_depart']
        nombre_personnes = attrs.get('nombre_personnes', 1)

        # Simulation préalable via une instance non enregistrée pour exécuter clean()
        reservation_preview = Reservation(
            client=self.context['request'].user,
            logement=logement,
            date_arrivee=date_arrivee,
            date_depart=date_depart,
            nombre_personnes=nombre_personnes,
            statut=Reservation.StatutReservation.EN_ATTENTE
        )

        try:
            reservation_preview.clean()
        except DjangoValidationError as e:
            if hasattr(e, 'message_dict'):
                raise serializers.ValidationError(e.message_dict)
            raise serializers.ValidationError({"detail": e.messages})

        return attrs

    def create(self, validated_data):
        client = self.context['request'].user
        logement = validated_data['logement_id']
        date_arrivee = validated_data['date_arrivee']
        date_depart = validated_data['date_depart']
        nombre_personnes = validated_data.get('nombre_personnes', 1)

        try:
            return creer_reservation(
                client=client,
                logement=logement,
                date_arrivee=date_arrivee,
                date_depart=date_depart,
                nombre_personnes=nombre_personnes
            )
        except DjangoValidationError as e:
            if hasattr(e, 'message_dict'):
                raise serializers.ValidationError(e.message_dict)
            raise serializers.ValidationError({"detail": e.messages})
