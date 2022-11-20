import datetime
from typing import Any
from rest_framework import serializers

from .models import DiaryEntry, SleepDiary, SleepRestrictionPlan


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
    # finished = serializers.CharField(source="finished", read_only=True)
    class Meta:
        model = DiaryEntry
        fields = ['id', 'date', 'diary', 'day_rating', 'naps', 'sleep_aides', 'sleep_aides_detail', 'notes', 'sleep_quality', 'bedtime', 'lights_out', 'time_to_sleep', 'night_wakes', 'waketime', 'risetime', 'finished']

class SleepRestrictionPlanSerializer(serializers.ModelSerializer[SleepRestrictionPlan]):

    bedtime = serializers.SerializerMethodField('calculate_bedtime')

    def calculate_bedtime(self, plan: SleepRestrictionPlan) -> datetime.time:
        # Python doesn't support subtracting a timedelta from a datetime.time object.
        # This is bad and they should feel bad.
        # So we're instead creating a timedelta which represents the offset from midnight when bedtime is,
        # then wrapping that around modulo 24 hours (so -2h becomes 22:00),
        # and converting that back into a datetime.time object via the number of seconds in the delta
        time = datetime.timedelta(hours=plan.custom_rise_time.hour, minutes=plan.custom_rise_time.minute) - plan.duration
        if time < datetime.timedelta(0):
            time += datetime.timedelta(hours=24)
        return datetime.time(hour=int(time.total_seconds()) // 3600, minute=int((time.total_seconds()) % 3600) // 60)

    def create(self, validated_data: Any) -> SleepRestrictionPlan:
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    class Meta:
        model = SleepRestrictionPlan
        fields = ('id', 'week', 'custom_rise_time', 'duration', 'bedtime')
