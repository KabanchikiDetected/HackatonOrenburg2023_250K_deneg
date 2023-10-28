from rest_framework import serializers

from apps.core.models import Company


class CompanySerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = Company
        fields = "__all__"
