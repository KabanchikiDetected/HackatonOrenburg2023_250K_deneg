from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .serializers import *
from .utils import generate_code, send_email
from apps.core.models import User, Employee, Department

from drf_yasg.utils import swagger_auto_schema


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


class UserResetPasswordAPIView(APIView):
    @swagger_auto_schema(request_body=UserResetPasswordSerializer)
    def post(self, request):
        user_email = request.data["email"]
        user = get_object_or_404(User, email=user_email)

        code = generate_code()
        user.recovery_code = code

        send_email(
            "Восстановление пароля", f"Вот ваш код йоууу {code}", [user_email]
        )
        user.save()
        return Response(
            {
                "status": "sent",
                "code": code
            }, status=status.HTTP_200_OK
        )

    @swagger_auto_schema(
        request_body=UserResetPasswordConfirmationSerializer
    )
    def put(self, request):
        user_code = request.data["recovery_code"]
        user_email = request.data["email"]
        new_password = request.data["password"]
        user = get_object_or_404(User, email=user_email)

        if user_code == user.recovery_code and user.recovery_code != "":
            user.set_password(new_password)
            user.recovery_code = ""
            user.save()
            return Response(
                {"status": "success"},
                status=status.HTTP_200_OK
            )

        return Response(
            {"status": "wrong code"},
            status=status.HTTP_400_BAD_REQUEST
        )


class EmployeeListAPIView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSeializer

    def post(self, request):
        """
        Example data: {
            "email": "",
            "first_name": "",
            "last_name": "",
            "birthday": "",
            "password": "",
            "phone": "",
            "department_id": int
        }
        """
        data = request.data
        user = User.objects.get_or_create(
            email=data["email"], first_name=data["first_name"],
            last_name=data["last_name"], role="employee",
            birthday=data["birthday"], password=["password"],
            phone=data["phone"]
        )
        user_detail, created = user
        if created:
            department = get_object_or_404(
                Department, pk=data["department_id"]
            )
            
            employee = Employee.objects.get_or_create(
                user=user_detail, department=department
            )
            
            employee_detail, employee_created = employee
            if employee_created:
                serializer = EmployeeSeializer(employee_detail)
                return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(
            {"detail": "Такой пользователь уже существует"},
            status=status.HTTP_400_BAD_REQUEST
        )


class EmployeeDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSeializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk, *args, **kwargs):
        employee = get_object_or_404(Employee, user__pk=pk)
        serializer = EmployeeSeializer(employee)
        return Response(serializer.data, status=status.HTTP_200_OK)

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
