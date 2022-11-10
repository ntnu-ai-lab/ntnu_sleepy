from datetime import date, timedelta
from typing import Any
from uuid import uuid4
from rest_framework import viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from django.db import models

from somnus.common.request import AuthenticatedRequest

from .serializers import DiaryEntrySerializer, SleepDiarySerializer, SleepRestrictionPlanSerializer

from .models import DiaryEntry, SleepDiary, SleepRestrictionPlan

class SleepDiaryViewSet(viewsets.ModelViewSet):
    def get_queryset(self) -> models.QuerySet[SleepDiary]:
        return SleepDiary.objects.filter(user=self.request.user)
    serializer_class = SleepDiarySerializer

class DiaryEntryViewSet(viewsets.ModelViewSet):
    def get_queryset(self) -> models.QuerySet[DiaryEntry]:
        return DiaryEntry.objects.filter(diary__user=self.request.user)
    serializer_class = DiaryEntrySerializer

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        request.data.update({'diary': kwargs['diary_pk']})
        return super().create(request, *args, **kwargs)

    def update(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        request.data.update({'diary': kwargs['diary_pk']})
        return super().update(request, *args, **kwargs)

class SleepRestrictionPlanViewSet(viewsets.ModelViewSet):
    serializer_class = SleepRestrictionPlanSerializer
    queryset: models.Manager[SleepRestrictionPlan]

    def get_queryset(self) -> models.QuerySet[SleepRestrictionPlan]:
        return SleepRestrictionPlan.objects.filter(user=self.request.user)

    def create(self, request: AuthenticatedRequest, *args: Any, **kwargs: Any) -> Response: # type: ignore [override]
        try:
            duration = max(SleepDiary.objects.get(user=request.user).average_sleep_duration, timedelta(hours=5))
        except SleepDiary.DoesNotExist:
            duration = timedelta(hours=5)
        request.data.update({'user': request.user.id, 'duration': duration})
        return super().create(request, *args, **kwargs)

    def list(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        plan = SleepRestrictionPlan.objects.filter(user=request.user).first()

        if plan and plan.week < date.today() - timedelta(weeks=1):
            plan = self.queryset.create(
                id=uuid4(),
                user=plan.user,
                custom_rise_time=plan.custom_rise_time,
                week=date.today(),
                duration=plan.duration + timedelta(minutes=20) if plan.user.diary.first().average_efficiency > 0.8 else plan.duration
            )

        return Response(self.serializer_class(plan).data)

