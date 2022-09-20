from rest_framework.routers import DefaultRouter
from django.urls import path, include

from somnus.users.views import UserViewSet, AdminsViewSet

router = DefaultRouter()

router.register('', UserViewSet, basename='user')
router.register('/admins', AdminsViewSet)

urlpatterns = [path('', include(router.urls))]