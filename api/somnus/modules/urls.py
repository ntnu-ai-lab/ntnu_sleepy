from rest_framework.routers import DefaultRouter
from django.urls import path, include

from .views import AnswerViewSet, AnswerListViewSet, InputViewSet, ModuleViewSet, PageViewSet, SectionViewSet

router = DefaultRouter()


router.register('pages', PageViewSet)
router.register('sections', SectionViewSet)
router.register('modules', ModuleViewSet)
router.register('answer-list', AnswerListViewSet, 'answer-lists')
router.register('answer', AnswerViewSet, 'answers')
router.register('inputs', InputViewSet)


urlpatterns = [
    path('', include(router.urls))
]