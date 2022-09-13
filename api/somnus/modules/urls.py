from rest_framework.routers import DefaultRouter
from django.urls import path, include

from .views import AnswerViewSet, AnswersViewSet, InputViewSet, ModuleViewSet, PageViewSet, SectionViewSet

router = DefaultRouter()


router.register('pages', PageViewSet)
router.register('sections', SectionViewSet)
router.register('modules', ModuleViewSet)
router.register('answers', AnswersViewSet)
router.register('answer', AnswerViewSet)
router.register('inputs', InputViewSet)


urlpatterns = [
    path('', include(router.urls))
]