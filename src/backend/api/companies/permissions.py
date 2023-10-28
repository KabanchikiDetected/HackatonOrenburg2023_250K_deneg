from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    def has_permission(self, request, view) -> bool:
        return bool(
            request.user and
            request.user.role in ["company_admin", "administrator"]
        )


class IsSuperAdmin(BasePermission):
    def has_permission(self, request, view):
        if request.user.role == "administrator":
            return True
        return False
