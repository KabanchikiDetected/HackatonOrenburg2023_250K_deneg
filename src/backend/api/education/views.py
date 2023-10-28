from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


from .serializers import *
from .models import TestLog


class TestLogListAPIView(generics.ListCreateAPIView):
    queryset = TestLog.objects.all()
    serializer_class = TestLogSerializer
    permission_classes = (IsAuthenticated,)
