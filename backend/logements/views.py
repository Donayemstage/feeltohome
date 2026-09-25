from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Logement
from .serializers import LogementSerializer

class LogementListView(generics.ListAPIView):
    queryset = Logement.objects.filter(statut=Logement.StatutLogement.DISPONIBLE).prefetch_related('photos', 'equipements')
    serializer_class = LogementSerializer

class LogementDetailView(generics.RetrieveAPIView):
    queryset = Logement.objects.all().prefetch_related('photos', 'equipements')
    serializer_class = LogementSerializer
    lookup_field = 'slug'

class HealthCheckView(APIView):
    def get(self, request):
        return Response({
            "status": "PASS",
            "app": "FeelToHome Backend API",
            "version": "0.1.0-phase0",
            "database": "OK"
        })
