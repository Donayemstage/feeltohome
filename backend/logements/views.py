from django.db.models import Q
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Logement, Equipement
from .serializers import LogementSerializer, EquipementSerializer

class LogementListView(generics.ListAPIView):
    serializer_class = LogementSerializer

    def get_queryset(self):
        queryset = Logement.objects.filter(
            statut=Logement.StatutLogement.DISPONIBLE
        ).prefetch_related('photos', 'equipements').select_related('proprietaire')

        # 1. Filter by city/destination (support 'ville' and 'destination' alias)
        ville = self.request.query_params.get('ville') or self.request.query_params.get('destination')
        if ville and ville.strip():
            queryset = queryset.filter(ville__icontains=ville.strip())

        # 2. Filter by type
        type_param = self.request.query_params.get('type')
        if type_param and type_param.strip() and type_param.upper() != 'TOUS':
            queryset = queryset.filter(type=type_param.strip().upper())

        # 3. Filter by price range
        prix_min = self.request.query_params.get('prix_min') or self.request.query_params.get('min_price')
        if prix_min and prix_min.isdigit():
            queryset = queryset.filter(prix_par_nuit__gte=int(prix_min))

        prix_max = self.request.query_params.get('prix_max') or self.request.query_params.get('max_price')
        if prix_max and prix_max.isdigit():
            queryset = queryset.filter(prix_par_nuit__lte=int(prix_max))

        # 4. Filter by equipment slug(s)
        equipements = self.request.query_params.getlist('equipements') or self.request.query_params.getlist('equipement')
        if equipements:
            for eq in equipements:
                if eq.strip():
                    queryset = queryset.filter(equipements__slug=eq.strip())

        # 5. Text search (q / search)
        search_query = self.request.query_params.get('search') or self.request.query_params.get('q')
        if search_query and search_query.strip():
            sq = search_query.strip()
            queryset = queryset.filter(
                Q(nom__icontains=sq) |
                Q(description__icontains=sq) |
                Q(ville__icontains=sq) |
                Q(quartier__icontains=sq)
            )

        # 6. Ordering / Sorting
        ordering = self.request.query_params.get('ordering')
        if ordering == 'price_asc':
            queryset = queryset.order_by('prix_par_nuit')
        elif ordering == 'price_desc':
            queryset = queryset.order_by('-prix_par_nuit')
        elif ordering == 'recent':
            queryset = queryset.order_by('-date_creation')
        else:
            queryset = queryset.order_by('-date_creation')

        return queryset.distinct()


class LogementDetailView(generics.RetrieveAPIView):
    queryset = Logement.objects.all().prefetch_related('photos', 'equipements').select_related('proprietaire')
    serializer_class = LogementSerializer
    lookup_field = 'slug'


class EquipementListView(generics.ListAPIView):
    queryset = Equipement.objects.all().order_by('nom')
    serializer_class = EquipementSerializer


class HealthCheckView(APIView):
    def get(self, request):
        return Response({
            "status": "PASS",
            "app": "FeelToHome Backend API",
            "version": "0.2.0-phase1",
            "database": "OK"
        })
