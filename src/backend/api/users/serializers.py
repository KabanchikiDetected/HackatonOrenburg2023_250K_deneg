from rest_framework import serializers

from apps.core.models import User, Employee


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


class UserResetPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email",)


class UserResetPasswordConfirmationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "recovery_code", "password")


class EmployeeSeializer(serializers.ModelSerializer):
    joined = serializers.DateTimeField(read_only=True)
    first_name = serializers.CharField(
        source="user.first_name", read_only=True
    )
    last_name = serializers.CharField(
        source="user.last_name", read_only=True
    )
    birthday = serializers.CharField(
        source="user.birthday", read_only=True
    )
    phone = serializers.CharField(
        source="user.phone", read_only=True
    )

    class Meta:
        model = Employee
        fields = "__all__"
