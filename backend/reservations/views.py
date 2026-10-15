from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from datetime import datetime

from logements.models import Logement
from .models import Reservation
from .serializers import ReservationSerializer, ReservationCreateSerializer
from .permissions import IsReservationParticipantOrAdmin
from .services import verifier_disponibilite


class ReservationListCreateView(generics.ListCreateAPIView):
    """
    GET : Liste les réservations pertinentes pour l'utilisateur connecté :
          - Client : uniquement ses propres réservations.
          - Propriétaire : ses réservations + celles de ses biens.
          - Administrateur : toutes les réservations.
    POST : Crée une nouvelle réservation pour le client authentifié.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ReservationCreateSerializer
        return ReservationSerializer

    def get_queryset(self):
        user = self.request.user
        base_qs = Reservation.objects.select_related('logement', 'client')

        if user.is_staff or getattr(user, 'role', '') == 'ADMIN':
            return base_qs.all()

        if getattr(user, 'role', '') == 'PROPRIETAIRE':
            return base_qs.filter(Q(client=user) | Q(logement__proprietaire=user))

        return base_qs.filter(client=user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        output_serializer = ReservationSerializer(instance, context=self.get_serializer_context())
        headers = self.get_success_headers(output_serializer.data)
        return Response(output_serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ReservationDetailView(generics.RetrieveAPIView):
    """
    Détail d'une réservation.
    Accessible uniquement au client réservateur, à l'hôte du bien ou à l'admin.
    """
    permission_classes = [permissions.IsAuthenticated, IsReservationParticipantOrAdmin]
    serializer_class = ReservationSerializer
    queryset = Reservation.objects.select_related('logement', 'client')


class ReservationAnnulerView(APIView):
    """
    Annulation d'une réservation en attente ou confirmée.
    Accessible par le client, l'hôte ou l'administrateur.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        reservation = get_object_or_404(Reservation.objects.select_related('logement'), pk=pk)

        try:
            reservation.annuler(request.user)
            return Response({
                "statut": "ANNULEE",
                "message": "La réservation a été annulée avec succès."
            }, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({"erreur": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ReservationConfirmerView(APIView):
    """
    Confirmation d'une réservation en attente.
    Réservé au propriétaire du bien ou à l'administrateur.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        reservation = get_object_or_404(Reservation.objects.select_related('logement'), pk=pk)

        try:
            reservation.confirmer(request.user)
            return Response({
                "statut": "CONFIRMEE",
                "message": "La réservation a été confirmée avec succès."
            }, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({"erreur": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ReservationDisponibiliteView(APIView):
    """
    Endpoint public de vérification de disponibilité pour un logement et des dates données.
    Ne nécessite pas d'authentification pour permettre la pré-réservation côté frontend.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        logement_id = request.query_params.get('logement_id')
        date_arrivee_str = request.query_params.get('date_arrivee')
        date_depart_str = request.query_params.get('date_depart')

        if not logement_id or not date_arrivee_str or not date_depart_str:
            return Response({
                "disponible": False,
                "message": "Paramètres obligatoires : logement_id, date_arrivee (YYYY-MM-DD), date_depart (YYYY-MM-DD)."
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            logement = Logement.objects.get(pk=logement_id)
        except Logement.DoesNotExist:
            return Response({
                "disponible": False,
                "message": "Logement introuvable."
            }, status=status.HTTP_404_NOT_FOUND)

        try:
            date_arrivee = datetime.strptime(date_arrivee_str.strip(), "%Y-%m-%d").date()
            date_depart = datetime.strptime(date_depart_str.strip(), "%Y-%m-%d").date()
        except ValueError:
            return Response({
                "disponible": False,
                "message": "Format de date invalide. Format attendu : YYYY-MM-DD."
            }, status=status.HTTP_400_BAD_REQUEST)

        resultat = verifier_disponibilite(logement, date_arrivee, date_depart)
        return Response(resultat, status=status.HTTP_200_OK)
