from rest_framework.routers import DefaultRouter
from django.urls import path, include

from .views import QuestionViewSet, SleepDiaryViewSet

router = DefaultRouter()

router.register('diary', SleepDiaryViewSet, basename='sleepdiary')
router.register('question', QuestionViewSet, basename='questions')

urlpatterns = [path('', include(router.urls))]