from django.contrib import admin

from .models import *


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "first_name", "phone", "role")
    list_display_links = ("email",)
    list_filter = ("role",)


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ("user", "rating", "department")
    list_display_links = ("user",)


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ("title", "created")
    list_display_links = ("title",)


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ("company", "title", "created")
    list_display_links = ("title",)
