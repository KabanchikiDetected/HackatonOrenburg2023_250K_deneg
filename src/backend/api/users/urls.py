from django.urls import path, re_path, include

from .views import *


urlpatterns = [
    path('auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    path('users/<int:pk>/', UserDetailAPIView.as_view(), name="user_detail"),
    path('users/', UserListAPIView.as_view(), name="user_list"),
    path('users/role/<int:pk>', UserRoleAPIView.as_view(), name="user_role"),
    path('users/password_reset/', UserResetPasswordAPIView.as_view()),
    path(
        'employees/',
        EmployeeListAPIView.as_view(),
        name="employee_list"
    ),
    path(
        'employees/<int:pk>/',
        EmployeeDetailAPIView.as_view(),
        name="employee_detail"
    )
]
