from rest_framework import permissions


class IsReservationParticipantOrAdmin(permissions.BasePermission):
    """
    Permission accordée uniquement au client ayant réservé,
    au propriétaire du logement concerné, ou à un administrateur.
    """
    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False

        # Administrateur ou staff
        if request.user.is_staff or getattr(request.user, 'role', '') == 'ADMIN':
            return True

        # Client ayant créé la réservation
        if obj.client_id == request.user.id:
            return True

        # Propriétaire du logement
        if hasattr(obj.logement, 'proprietaire_id') and obj.logement.proprietaire_id == request.user.id:
            return True

        return False
