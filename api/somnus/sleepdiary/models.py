import datetime
import uuid
from django.db import models
from django.contrib.postgres.fields import ArrayField

from somnus.users.models import User

class SleepDiary(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(to=User, related_name='sleep_diary', on_delete=models.CASCADE)
    started_date = models.DateField(default=datetime.date.today)

    entries: models.Manager['DiaryEntry']

class DiaryEntry(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateField(default=datetime.date.today, editable=True)
    diary = models.ForeignKey(to=SleepDiary, related_name='entry', on_delete=models.CASCADE)
    day_rating = models.IntegerField()
    naps = ArrayField(ArrayField(models.DateTimeField(), size=2), size=100, blank=True)
    sleep_aides = models.BooleanField(blank=True, null=True)
    sleep_aides_detail = models.CharField(max_length=225, blank=True, null=True)
    notes = models.TextField(default='', blank=True)
    sleep_quality = models.IntegerField(default=0)
    bedtime = models.DateTimeField(blank=True, null=True)
    lights_out = models.DateTimeField(blank=True, null=True)
    time_to_sleep = models.IntegerField(default=0)
    night_wakes = ArrayField(models.IntegerField(), size=30, blank=True, null=True)
    waketime = models.DateTimeField(blank=True, null=True)
    risetime = models.DateTimeField(blank=True, null=True)

    @property
    def finished(self) -> bool:
        return self.bedtime is not None

    @property
    def sleep_duration(self) -> datetime.timedelta:
        if self.waketime is None or self.lights_out is None:
            return datetime.timedelta(0)
        return self.waketime - (self.lights_out + datetime.timedelta(minutes=self.time_to_sleep)) - datetime.timedelta(minutes=sum(self.night_wakes if self.night_wakes else [0]))

    class Meta:
        unique_together = ('date', 'diary')
        ordering = ['-date']
