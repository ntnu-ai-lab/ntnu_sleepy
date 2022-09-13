from rest_framework.routers import DefaultRouter
from django.urls import path, include

from .views import ModuleViewSet, PageViewSet, SectionViewSet

router = DefaultRouter()


router.register('pages', PageViewSet)
router.register('sections', SectionViewSet)
router.register('modules', ModuleViewSet)


urlpatterns = [
    path('', include(router.urls))
]