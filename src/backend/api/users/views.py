from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .serializers import *
from apps.core.models import User


class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer


class UserDetailView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = (IsAuthenticated,)
