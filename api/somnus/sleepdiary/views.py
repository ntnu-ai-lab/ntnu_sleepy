from rest_framework import viewsets
from django.db import models

from .serializers import QuestionSerializer, SleepDiarySerializer

from .models import Question, SleepDiary

class SleepDiaryViewSet(viewsets.ReadOnlyModelViewSet):
    def get_queryset(self) -> models.QuerySet[SleepDiary]:
        return SleepDiary.objects.filter(user=self.request.user)
    serializer_class = SleepDiarySerializer

class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer