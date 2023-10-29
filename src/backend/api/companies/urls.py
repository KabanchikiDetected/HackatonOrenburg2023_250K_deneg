from django.urls import path

from .views import *

urlpatterns = [
    path('company/', CompanyListManageView.as_view(), name="comapny_list"),
    path(
        'company/<int:pk>/',
        CompanyDetailAPIView.as_view(),
        name="company_detail"
    ),
    path(
        'department/', 
        DepartmentListAPIView.as_view(), 
        name="department_list"
        ),
    path(
        'department/<int:pk>/',
        DepartmentDetailAPIView.as_view(),
        name="department_detail"
    )
]
