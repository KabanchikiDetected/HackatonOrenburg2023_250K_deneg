from django.urls import path

from .views import *

urlpatterns = [
    path('company/', CompanyListManageView.as_view(), name="comapny_list"),
    path(
        'company/<int:pk>/',
        CompanyDetailManageView.as_view(),
        name="company_detail"
    )
]
