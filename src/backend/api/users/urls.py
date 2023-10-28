from django.urls import path, re_path, include

from .views import *


urlpatterns = [
    path('auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    path('users/<int:pk>/', UserDetailView.as_view(), name="user_detail"),
    path('users/', UserListView.as_view(), name="user_list")
]
