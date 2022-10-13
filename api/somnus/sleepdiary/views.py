from rest_framework import viewsets
from django.db import models

from .serializers import DiaryEntrySerializer, SleepDiarySerializer

from .models import DiaryEntry, SleepDiary

class SleepDiaryViewSet(viewsets.ModelViewSet):
    def get_queryset(self) -> models.QuerySet[SleepDiary]:
        return SleepDiary.objects.filter(user=self.request.user)
    serializer_class = SleepDiarySerializer

class DiaryEntryViewSet(viewsets.ModelViewSet):
    def get_queryset(self) -> models.QuerySet[DiaryEntry]:
        return DiaryEntry.objects.filter(diary__user=self.request.user)
    serializer_class = DiaryEntrySerializer