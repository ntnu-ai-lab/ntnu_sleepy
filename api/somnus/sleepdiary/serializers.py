from typing import Any
from rest_framework import serializers

from .models import DiaryEntry, SleepDiary


class SleepDiarySerializer(serializers.ModelSerializer[SleepDiary]):
    started_date = serializers.DateField(required=False, read_only=True)
    user = serializers.UUIDField(required=False, read_only=True)
    class Meta:
        fields = ['id', 'user', 'started_date']
        model = SleepDiary

    def create(self, validated_data: Any) -> SleepDiary:
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class DiaryEntrySerializer(serializers.ModelSerializer[DiaryEntry]):
    class Meta:
        model = DiaryEntry
        fields = '__all__'
