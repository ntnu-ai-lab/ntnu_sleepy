import uuid
from django.db import models

from somnus.users.models import User

class SleepDiary(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(to=User, related_name='sleep_diary', on_delete=models.CASCADE)
    started_date = models.DateField()

    entries: models.Manager['DiaryEntry']

class DiaryEntry(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    diary = models.ForeignKey(to=SleepDiary, related_name='entry', on_delete=models.CASCADE)
    notes = models.TextField(default='')
    rating = models.IntegerField(default=0)
    bedtime = models.DateTimeField()
    sleeptime = models.DateTimeField()
    waketime = models.DateTimeField()
    risetime = models.DateTimeField()

    answers: models.Manager['Answer']

class Question(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.CharField(max_length=255)
    ordering = models.PositiveIntegerField(
        default=0,
        blank=False,
        null=False,
        db_index=True,
    )

    def __str__(self) -> str:
        return self.question

    class Meta:
        ordering = ['ordering']

    answers: models.Manager['Answer']

class Answer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.ForeignKey(to=Question, related_name='answers', on_delete=models.CASCADE)
    entry = models.ForeignKey(to=DiaryEntry, related_name='answers', on_delete=models.CASCADE)
    answer = models.CharField(max_length=255)

    class Meta:
        unique_together = ('question', 'entry')

