from django.urls import path
from .views import (
    ReservationListCreateView,
    ReservationDetailView,
    ReservationAnnulerView,
    ReservationConfirmerView,
    ReservationDisponibiliteView
)

urlpatterns = [
    path('', ReservationListCreateView.as_view(), name='reservation-list-create'),
    path('disponibilite/', ReservationDisponibiliteView.as_view(), name='reservation-disponibilite'),
    path('<int:pk>/', ReservationDetailView.as_view(), name='reservation-detail'),
    path('<int:pk>/annuler/', ReservationAnnulerView.as_view(), name='reservation-annuler'),
    path('<int:pk>/confirmer/', ReservationConfirmerView.as_view(), name='reservation-confirmer'),
]
