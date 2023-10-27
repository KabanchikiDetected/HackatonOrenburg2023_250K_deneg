from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    UserManager
)
from django.utils import timezone
from phonenumber_field.modelfields import PhoneNumberField


USER_ROLES = (
    ("employee", "Работник"),
    ("hr", "Менеджер по персоналу"),
    ("company_admin", "Администратор компании"),
    ("administrator", "Администратор платформы")
)


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(
        "Username",
        max_length=50, default=""
    )

    email = models.EmailField(
        "Email", max_length=254, unique=True
    )

    first_name = models.CharField(
        "Имя", max_length=127
    )

    last_name = models.CharField(
        "Фамилия", max_length=127
    )

    birthday = models.DateField(
        "День рождения", auto_now=False, auto_now_add=False
    )

    phone = PhoneNumberField(
        "Номер телефона", unique=True
    )

    role = models.CharField(
        "Роль",
        max_length=50,
        choices=USER_ROLES
    )
    
    is_staff = models.BooleanField(
        "Django Администратор",
        default=False
    )

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "birthday"]

    class Meta:
        db_table = "user"
        verbose_name = "Пользователь"
        verbose_name = "Пользователи"

    def __str__(self) -> str:
        return f"User: {self.pk}"

    def save(self, *args, **kwargs) -> 'User':
        return super(User, self).save(*args, **kwargs)
