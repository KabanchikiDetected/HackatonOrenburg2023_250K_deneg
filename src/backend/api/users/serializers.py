from rest_framework import serializers
from rest_framework.renderers import JSONRenderer

from apps.core.models import User


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "pk", "email", "first_name", "last_name", "role"
        )


class UserDetailSerializer(serializers.ModelSerializer):
    joined = serializers.DateTimeField(read_only=True)
    role = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = (
            "pk", "email", "first_name",
            "last_name", "birthday", "phone",
            "role", "joined", "company"
        )
