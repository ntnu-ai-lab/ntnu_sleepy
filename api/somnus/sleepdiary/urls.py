from rest_framework_nested import routers
from django.urls import path, include

from .views import DiaryEntryViewSet, SleepDiaryViewSet

router = routers.DefaultRouter()

router.register('diary', SleepDiaryViewSet, basename='sleepdiary')

diary_router = routers.NestedSimpleRouter(router, 'diary', lookup='diary')
diary_router.register(r'entries', DiaryEntryViewSet, basename='entries')

urlpatterns = [path('', include(router.urls)), path('', include(diary_router.urls))]