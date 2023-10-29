from rest_framework import serializers

from apps.core.models import Company, Department


class CompanySerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Company
        fields = "__all__"


class DepartmentSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(read_only=True)
    company_title = serializers.CharField(
        source="company.title", read_only=True
    )

    class Meta:
        model = Department
        fields = "__all__"
