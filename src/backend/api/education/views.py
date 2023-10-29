from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from .utils import *
from .serializers import *
from .models import TestLog
from apps.core.models import Employee


class TestLogListAPIView(generics.ListCreateAPIView):
    queryset = TestLog.objects.all()
    serializer_class = TestLogSerializer
    permission_classes = (IsAuthenticated,)
    
    def post(self, request, *args, **kwargs):
        employee = get_object_or_404(Employee, user__pk=request.data["user"])
        correct, total = request.data["correct"], request.data["total"]
        rating = count_rating(employee.rating, correct, total)
        employee.rating = rating
        employee.save()
        return super().post(request, *args, **kwargs)
