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

    @property
    def average_sleep_duration(self) -> datetime.timedelta:
        entries = self.entries.order_by('-date')[:7]
        if not entries:
            return datetime.timedelta(0)
        return sum([entry.sleep_duration for entry in entries], datetime.timedelta()) / len(entries)

    @property
    def average_efficiency(self) -> float:
        entries = self.entries.order_by('-date')[:7]
        if not entries:
            return 0
        return sum([entry.efficiency for entry in entries]) / len(entries)

    def __str__(self) -> str:
        return str(self.user)

    class Meta:
        verbose_name_plural = 'Sleep diaries'

class DiaryEntry(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateField(default=datetime.date.today, editable=True) #Endre til editable=True igjen fordi jeg fikk rar oppførsel med editable=False
    diary = models.ForeignKey(to=SleepDiary, related_name='entries', on_delete=models.CASCADE)
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

    @property
    def bed_duration(self) -> datetime.timedelta:
        if self.bedtime is None or self.risetime is None:
            return datetime.timedelta(0)
        return self.risetime - self.bedtime

    @property
    def efficiency(self) -> float:
        return self.sleep_duration / self.bed_duration

    class Meta:
        unique_together = ('date', 'diary')
        ordering = ['-date']

class SleepRestrictionPlan(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(to=User, related_name='sleep_restriction_plan', on_delete=models.CASCADE)
    week = models.DateField(default=datetime.date.today)
    custom_rise_time = models.TimeField(default=datetime.time.fromisoformat('07:00+00:00'))
    duration = models.DurationField(default=datetime.timedelta(hours=5))

    class Meta:
        unique_together = ('user', 'week')
        ordering = ('-week',)
    