from rest_framework import serializers

from .models import TestLog


class TestLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestLog
        fields = "__all__"
