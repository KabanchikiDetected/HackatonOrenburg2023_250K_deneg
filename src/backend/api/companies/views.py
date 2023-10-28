from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import *
from .permissions import IsAdmin, IsSuperAdmin
from apps.core.models import Company


class BaseManageView(APIView):
    def dispatch(self, request, *args, **kwargs):
        if not hasattr(self, 'VIEWS_BY_METHOD'):
            raise Exception('VIEWS_BY_METHOD static dictionary variable must be defined on a ManageView class!')
        if request.method in self.VIEWS_BY_METHOD:
            return self.VIEWS_BY_METHOD[request.method]()(request, *args, **kwargs)

        return Response(status=405)


class CompanyListAPIView(generics.ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class CompanyDetailAPIView(generics.RetrieveAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = (IsAuthenticated,)


class CompanyUpdateAPIView(generics.UpdateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = (IsAuthenticated, IsAdmin)


class CompanyCreateAPIView(generics.CreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = (IsAuthenticated, IsAdmin)
    


class CompanyDeleteAPIView(generics.DestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = (IsSuperAdmin, IsAuthenticated)


class CompanyDetailManageView(BaseManageView):
    VIEWS_BY_METHOD = {
        'DELETE': CompanyDeleteAPIView.as_view,
        'GET': CompanyDetailAPIView.as_view,
        'PUT': CompanyUpdateAPIView.as_view,
        'PATCH': CompanyUpdateAPIView.as_view
    }


class CompanyListManageView(BaseManageView):
    VIEWS_BY_METHOD = {
        'GET': CompanyListAPIView.as_view,
        'POST': CompanyCreateAPIView.as_view
    }
