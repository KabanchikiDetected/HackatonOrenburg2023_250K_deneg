from rest_framework.permissions import BasePermission


class IsHR(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.role in ["hr", "company_admin", "administrator"]
        )
    

class IsAdmin(BasePermission):
    def has_permission(self, request, view) -> bool:
        return bool(
            request.user and
            request.user.role in ["company_admin", "administrator"]
        )


class IsSuperAdmin(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.role == "administrator"
        )
