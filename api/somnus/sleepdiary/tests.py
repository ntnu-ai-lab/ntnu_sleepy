from datetime import datetime, timedelta
from django.test import TestCase

from somnus.users.models import User

from .models import DiaryEntry, SleepDiary

class DiaryTestCase(TestCase):
    diary: SleepDiary
    user: User

    def setUp(self) -> None:
        self.user = User.objects.create()
        self.diary = SleepDiary.objects.create(user=self.user)

    def test_calculate_sleep_duration(self) -> None:
        entry = DiaryEntry.objects.create(
            diary=self.diary,
            day_rating=2,
            naps=[],
            lights_out=datetime.fromisoformat('2022-06-02T22:00+00:00'),
            time_to_sleep=30,
            night_wakes=[],
            waketime=datetime.fromisoformat('2022-06-03T06:00+00:00'))
        self.assertEqual(entry.sleep_duration, timedelta(hours=7.5))

    def test_sleep_duration_night_wakes(self) -> None:
        entry = DiaryEntry.objects.create(
            diary=self.diary,
            day_rating=2,
            naps=[],
            lights_out=datetime.fromisoformat('2022-06-02T22:00+00:00'),
            time_to_sleep=30,
            night_wakes=[20, 10, 30],
            waketime=datetime.fromisoformat('2022-06-03T06:00+00:00'))
        self.assertEqual(entry.sleep_duration, timedelta(hours=6.5))

