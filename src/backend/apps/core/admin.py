from django.contrib import admin

from .models import *

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "first_name", "phone", "role")
    list_display_links = ("email",)
    list_filter = ("role",)
