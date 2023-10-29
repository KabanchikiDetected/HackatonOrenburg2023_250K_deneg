from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *
from api.users.serializers import EmployeeSeializer
from .permissions import *
from apps.core.models import Company, Employee

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


class CompanyDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = (IsAuthenticated,)

    def put(self, request, *args, **kwargs):
        if request.user.role in ["company_admin", "administrator"]:
            return super().put(request, *args, **kwargs)
        return Response(FORBIDDEN_DETAIL, status=status.HTTP_403_FORBIDDEN)

    def patch(self, request, *args, **kwargs):
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
    
    def get(self, request, *args, **kwargs):
        company_id: str = request.GET.get("company", default="")
        if company_id == "" or not company_id.isdigit():
            return super().get(request, *args, **kwargs)
        else:
            departments = Department.objects.filter(company=company_id)
            serializer = DepartmentSerializer(departments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


class DepartmentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = (IsAuthenticated,)
    
    
    # TODO: add employees
    # TODO: employee put and patch user_id
    def get(self, request, pk, *args, **kwargs):
        employees = Employee.objects.filter(department=pk)
        department = Department.objects.get(pk=pk)
        serializer = DepartmentSerializer(department)
        employee_serializer = EmployeeSeializer(employees, many=True)
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
