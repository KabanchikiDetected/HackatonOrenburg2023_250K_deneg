from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .serializers import *
from apps.core.models import User, Employee


class UserListAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer


class UserDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = (IsAuthenticated,)


class UserRoleAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        return Response(
            {"role": user.role},
            status=status.HTTP_200_OK
        )


class EmployeeListAPIView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSeializer


class EmployeeDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSeializer
    permission_classes = (IsAuthenticated,)

    def destroy(self, request, pk: int):
        if request.user.role in ["hr", "company_admin", "administrator"]:
            employee: Employee = get_object_or_404(Employee, pk=pk)
            employee.is_active = False
            employee.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(
                {
                    "detail": "У вас недостаточно прав для выполнения данного действия."
                },
                status=status.HTTP_403_FORBIDDEN
            )
