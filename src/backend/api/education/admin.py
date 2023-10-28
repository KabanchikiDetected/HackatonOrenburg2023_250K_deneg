from django.contrib import admin

from .models import TestLog


@admin.register(TestLog)
class TestLogAdmin(admin.ModelAdmin):
    list_display = ("test_id", "user", "correct", "total")
    list_display_links = ("test_id", "user")
    list_filter = ("test_id",)
    