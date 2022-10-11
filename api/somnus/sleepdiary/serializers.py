from rest_framework import serializers

from .models import Question, SleepDiary

class QuestionSerializer(serializers.ModelSerializer[Question]):
    class Meta:
        fields = ['id', 'question']
        model = Question


class SleepDiarySerializer(serializers.ModelSerializer[SleepDiary]):
    class Meta:
        fields = ['id', 'user', 'started_date']
        model = SleepDiary