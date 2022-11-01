from rest_framework.routers import DefaultRouter
from django.urls import path, include

from somnus.users.views import UserViewSet

router = DefaultRouter()

router.register('', UserViewSet, basename='user')

urlpatterns = [path('', include(router.urls))]