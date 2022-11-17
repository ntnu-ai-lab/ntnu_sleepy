from rest_framework.routers import DefaultRouter
from django.urls import path, include

from somnus.users.views import UserViewSet, ProfileViewSet

router = DefaultRouter()

router.register('profiles', ProfileViewSet, basename='profile')
router.register('', UserViewSet, basename='user')

urlpatterns = [path('', include(router.urls))]