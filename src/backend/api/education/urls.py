from django.urls import path

from .views import TestLogListAPIView

urlpatterns = [
    path('tests/', TestLogListAPIView.as_view(), name="tests_list")
]
