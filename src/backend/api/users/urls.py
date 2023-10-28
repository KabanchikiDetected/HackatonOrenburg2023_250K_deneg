from django.urls import path, re_path, include
from rest_framework import permissions

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from .views import *


schema_view = get_schema_view(
    openapi.Info(
        title="Kabanchiki API",
        default_version='v1',
        description="This is Kabanchiki API. Welcome :)",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path(
        'docs/',
        schema_view.with_ui('swagger', cache_timeout=0),
        name='schema-swagger-ui'
    ),
    path('auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    path('users/<int:pk>/', UserDetailView.as_view(), name="user_detail"),
    path('users/', UserListView.as_view(), name="user_list")
]
