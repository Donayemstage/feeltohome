from django.db import transaction
from django.core.exceptions import ValidationError
from django.utils import timezone
from logements.models import Logement
from .models import Reservation


def verifier_disponibilite(logement, date_arrivee, date_depart):
    """
    Vérifie si un logement est disponible entre deux dates.
    Retourne un dictionnaire avec le statut, le nombre de nuits et le montant estimé.
    """
    if not date_arrivee or not date_depart:
        return {
            "disponible": False,
            "message": "Les dates d'arrivée et de départ sont obligatoires."
        }

    if date_depart <= date_arrivee:
        return {
            "disponible": False,
            "message": "La date de départ doit être postérieure à la date d'arrivée."
        }

    if date_arrivee < timezone.now().date():
        return {
            "disponible": False,
            "message": "La date d'arrivée ne peut pas être située dans le passé."
        }

    # Vérification des chevauchements de réservations actives
    conflits = Reservation.objects.filter(
        logement=logement,
        statut__in=[Reservation.StatutReservation.EN_ATTENTE, Reservation.StatutReservation.CONFIRMEE],
        date_arrivee__lt=date_depart,
        date_depart__gt=date_arrivee,
    )

    if conflits.exists():
        return {
            "disponible": False,
            "message": "Le logement est déjà réservé pour tout ou partie de cette période."
        }

    nombre_nuits = (date_depart - date_arrivee).days
    prix_total = logement.prix_par_nuit * nombre_nuits

    return {
        "disponible": True,
        "nombre_nuits": nombre_nuits,
        "prix_par_nuit": str(logement.prix_par_nuit),
        "prix_total": str(prix_total),
        "devise": logement.devise,
        "message": "Logement disponible pour ces dates."
    }


def creer_reservation(client, logement, date_arrivee, date_depart, nombre_personnes=1):
    """
    Crée une réservation de manière transactionnelle et atomique.
    Utilise un verrou pessimiste (select_for_update) sur le logement pour
    prévenir les conflits d'accès concurrents (deux clients réservant exactement
    les mêmes dates au même millième de seconde).
    """
    with transaction.atomic():
        # Verrouillage de la ligne du logement
        logement_verrouille = Logement.objects.select_for_update().get(id=logement.id)

        # Calcul automatique du prix total côté serveur
        if date_depart <= date_arrivee:
            raise ValidationError("La date de départ doit être postérieure à la date d'arrivée.")

        nuits = (date_depart - date_arrivee).days
        prix_total = logement_verrouille.prix_par_nuit * nuits

        reservation = Reservation(
            client=client,
            logement=logement_verrouille,
            date_arrivee=date_arrivee,
            date_depart=date_depart,
            nombre_personnes=nombre_personnes,
            prix_total=prix_total,
            statut=Reservation.StatutReservation.EN_ATTENTE
        )
        reservation.save()
        return reservation
