from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *
from api.users.serializers import EmployeeSerializer, UserDetailSerializer
from .permissions import *
from apps.core.models import Company, Employee, User

FORBIDDEN_DETAIL = {
    "detail": "У вас недостаточно прав для выполнения данного действия."
}


class BaseManageView(APIView):
    def dispatch(self, request, *args, **kwargs):
        if not hasattr(self, 'VIEWS_BY_METHOD'):
            raise Exception(
                'VIEWS_BY_METHOD static dictionary variable must be defined on a ManageView class!')
        if request.method in self.VIEWS_BY_METHOD:
            return self.VIEWS_BY_METHOD[request.method]()(request, *args, **kwargs)

        return Response(status=405)


class CompanyListAPIView(generics.ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    
    def get(self, request, *args, **kwargs):
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        data, new_data = serializer.data, []
        
        for el in data:
            el = dict(el)
            users = User.objects.filter(company=el["id"], role="hr")
            user_serializer = UserDetailSerializer(users, many=True)
            el["hr"] = user_serializer.data
            new_data.append(el)
        return Response(
            new_data, status=status.HTTP_200_OK
        )


class CompanyDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = (IsAuthenticated,)

    def put(self, request, pk, *args, **kwargs):
        if request.user.role in ["company_admin", "administrator"]:
            return super().put(request, *args, **kwargs)
        return Response(FORBIDDEN_DETAIL, status=status.HTTP_403_FORBIDDEN)

    def patch(self, request, pk, *args, **kwargs):
        if request.user.role in ["company_admin", "administrator"]:
            return super().patch(request, *args, **kwargs)
        return Response(FORBIDDEN_DETAIL, status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, *args, **kwargs):
        if request.user.role == "administrator":
            return super().delete(request, *args, **kwargs)
        return Response(FORBIDDEN_DETAIL, status=status.HTTP_403_FORBIDDEN)


class CompanyCreateAPIView(generics.CreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = (IsAuthenticated, IsAdmin)


class CompanyListManageView(BaseManageView):
    VIEWS_BY_METHOD = {
        'GET': CompanyListAPIView.as_view,
        'POST': CompanyCreateAPIView.as_view
    }


class DepartmentListAPIView(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = (IsAuthenticated, IsHR)

    def post(self, request, *args, **kwargs):
        if request.user.role in ["company_admin", "administrator"]:
            return super().post(request, *args, **kwargs)
        return Response(FORBIDDEN_DETAIL, status=status.HTTP_403_FORBIDDEN)

    # Временный вариант (самому стыдно за это... но не хватает времени)
    def get(self, request, *args, **kwargs):
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        data = serializer.data
        new_data = []

        for el in data:
            el = dict(el)
            employees = Employee.objects.filter(department=el["id"])
            employee_serializer = EmployeeSerializer(employees, many=True)
            el["employees"] = employee_serializer.data
            new_data.append(el)

        company_id: str = request.GET.get("company", default="")

        if company_id == "" or not company_id.isdigit():
            return Response(new_data, status=status.HTTP_200_OK)
        else:
            new_data = [
                department for department in new_data 
                if department['company'] == int(company_id)
            ]
            return Response(new_data, status=status.HTTP_200_OK)


class DepartmentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk, *args, **kwargs):
        employees = Employee.objects.filter(department=pk)
        department = Department.objects.get(pk=pk)
        serializer = DepartmentSerializer(department)
        employee_serializer = EmployeeSerializer(employees, many=True)
        data = serializer.data
        data["employees"] = employee_serializer.data
        return Response(data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        if request.user.role in ["company_admin", "administrator"]:
            return super().put(request, *args, **kwargs)
        return Response(FORBIDDEN_DETAIL, status=status.HTTP_403_FORBIDDEN)

    def patch(self, request, *args, **kwargs):
        if request.user.role in ["company_admin", "administrator"]:
            return super().patch(request, *args, **kwargs)
        return Response(FORBIDDEN_DETAIL, status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, *args, **kwargs):
        if request.user.role in ["company_admin", "administrator"]:
            return super().delete(request, *args, **kwargs)
        return Response(FORBIDDEN_DETAIL, status=status.HTTP_403_FORBIDDEN)
