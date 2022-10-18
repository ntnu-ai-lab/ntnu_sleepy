from typing import Any
from rest_framework import serializers

from .models import DiaryEntry, SleepDiary


class SleepDiarySerializer(serializers.ModelSerializer[SleepDiary]):
    class Meta:
        fields = ['id', 'user', 'started_date']
        model = SleepDiary

class DiaryEntrySerializer(serializers.ModelSerializer[DiaryEntry]):
    class Meta:
        model = DiaryEntry
        fields = '__all__'

    def create(self, validated_data: Any) -> DiaryEntry:
        print(self.context['view'].kwargs)
        diary = SleepDiary.objects.get(id=self.context['view'].kwargs['diary_pk'])
        print(diary)
        validated_data['diary'] = diary
        return super().create(validated_data)