from rest_framework_nested import routers
from django.urls import path, include

from .views import DiaryEntryViewSet, SleepDiaryViewSet, SleepRestrictionPlanViewSet

router = routers.DefaultRouter()

router.register('diary', SleepDiaryViewSet, basename='sleepdiary')
router.register('sleeprestriction', SleepRestrictionPlanViewSet, basename='sleeprestriction')

diary_router = routers.NestedSimpleRouter(router, 'diary', lookup='diary')
diary_router.register(r'entries', DiaryEntryViewSet, basename='entries')

urlpatterns = [path('', include(router.urls)), path('', include(diary_router.urls))]