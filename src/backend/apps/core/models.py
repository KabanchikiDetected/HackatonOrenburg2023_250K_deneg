from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    UserManager
)
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator
from phonenumber_field.modelfields import PhoneNumberField
from PIL import Image


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

    joined = models.DateTimeField(
        "Присоединился", default=timezone.now
    )

    company = models.ForeignKey(
        "Company", verbose_name="Компания",
        on_delete=models.CASCADE, blank=True, null=True
    )

    is_staff = models.BooleanField(
        "Django Администратор",
        default=False
    )
    
    recovery_code = models.CharField(
        "Код восстановления", default="", max_length=5
    )

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "username", "birthday", "phone",
        "first_name", "last_name", "role"
    ]

    class Meta:
        db_table = "user"
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def __str__(self) -> str:
        return f"User: {self.email}"

    def save(self, *args, **kwargs) -> 'User':
        return super(User, self).save(*args, **kwargs)


class Employee(models.Model):
    user = models.OneToOneField(
        "User", verbose_name="Пользователь",
        on_delete=models.CASCADE
    )

    rating = models.FloatField(
        "Рейтинг", validators=[
            MinValueValidator(1),
            MaxValueValidator(5)
        ], default=5.0
    )

    department = models.ForeignKey(
        "Department", verbose_name="Отдел",
        on_delete=models.CASCADE
    )

    is_active = models.BooleanField(
        "Активен?", default=True
    )

    class Meta:
        verbose_name = "Работник"
        verbose_name_plural = "Работники"

    def __str__(self) -> str:
        return f"Employee: {self.user.email}"


class Company(models.Model):
    title = models.CharField(
        "Компания", max_length=127
    )

    description = models.CharField(
        "Описание", max_length=255
    )

    created = models.DateTimeField(
        "Присоединилась", default=timezone.now
    )

    image = models.ImageField(
        "Логотип", upload_to="media/logo",
        default="default_logo.png"
    )

    class Meta:
        verbose_name = "Компания"
        verbose_name_plural = "Компании"

    def __str__(self) -> str:
        return f"Company: {self.title}"


class Department(models.Model):
    company = models.ForeignKey(
        Company, verbose_name="Компания",
        on_delete=models.CASCADE
    )

    title = models.CharField(
        "Название отдела", max_length=127
    )

    created = models.DateTimeField(
        "Создан", default=timezone.now
    )

    class Meta:
        verbose_name = "Отдел"
        verbose_name_plural = "Отделы"

    def __str__(self) -> str:
        return f"Department: {self.title}"
