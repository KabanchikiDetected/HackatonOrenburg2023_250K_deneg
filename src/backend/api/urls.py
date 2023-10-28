from django.urls import path, include
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication

from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
    openapi.Info(
        title="Kabanchiki API",
        default_version='v1',
        description="This is Kabanchiki API. Welcome :)",
    ),
    public=True,
    permission_classes=(AllowAny,),
    authentication_classes=(TokenAuthentication,)
)

urlpatterns = [
    path(
        'docs/',
        schema_view.with_ui('swagger', cache_timeout=0),
        name='schema-swagger-ui'
    ),
    path('', include('api.users.urls')),
    path('', include('api.companies.urls'))
]
