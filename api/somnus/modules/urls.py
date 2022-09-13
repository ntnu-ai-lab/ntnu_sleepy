from rest_framework.routers import DefaultRouter
from django.urls import path, include

router = DefaultRouter()


urlpatterns = [
    path('', include(router.urls))
]