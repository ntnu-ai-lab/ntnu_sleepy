from datetime import date, datetime, timedelta
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

    def test_bed_duration(self) -> None:
        entry = DiaryEntry.objects.create(
            diary=self.diary,
            day_rating=2,
            naps=[],
            bedtime=datetime.fromisoformat('2022-06-02T21:00+00:00'),
            lights_out=datetime.fromisoformat('2022-06-02T22:00+00:00'),
            time_to_sleep=30,
            night_wakes=[20, 10, 30],
            waketime=datetime.fromisoformat('2022-06-03T06:00+00:00'),
            risetime=datetime.fromisoformat('2022-06-03T07:00+00:00'),
        )
        self.assertEqual(entry.bed_duration, timedelta(hours=10))

    def test_sleep_efficiency(self) -> None:
        entry = DiaryEntry.objects.create(
            diary=self.diary,
            day_rating=2,
            naps=[],
            bedtime=datetime.fromisoformat('2022-06-02T21:00+00:00'),
            lights_out=datetime.fromisoformat('2022-06-02T22:00+00:00'),
            time_to_sleep=30,
            night_wakes=[20, 10, 30],
            waketime=datetime.fromisoformat('2022-06-03T06:00+00:00'),
            risetime=datetime.fromisoformat('2022-06-03T07:00+00:00'),
        )
        self.assertEqual(entry.efficiency, 0.65)

    def test_average_sleep_time(self) -> None:
        # We're kind fo cheating here, because we don't _actually_ care about the date given in 'bedtime' etc.
        # However, this is bad and we should feel bad.
        # If you're refactoring and this test breaks, this is likely the reason!
        DiaryEntry.objects.create(
            date=date.today() - timedelta(days=4),
            diary=self.diary,
            day_rating=2,
            naps=[],
            bedtime=datetime.fromisoformat('2022-06-02T21:00+00:00'),
            lights_out=datetime.fromisoformat('2022-06-02T21:00+00:00'),
            time_to_sleep=30,
            night_wakes=[20, 10, 30],
            waketime=datetime.fromisoformat('2022-06-03T06:00+00:00'),
            risetime=datetime.fromisoformat('2022-06-03T07:00+00:00'),
        )
        DiaryEntry.objects.create(
            date=date.today() - timedelta(days=3),
            diary=self.diary,
            day_rating=2,
            naps=[],
            bedtime=datetime.fromisoformat('2022-06-03T21:00+00:00'),
            lights_out=datetime.fromisoformat('2022-06-03T22:00+00:00'),
            time_to_sleep=30,
            night_wakes=[20, 10, 30],
            waketime=datetime.fromisoformat('2022-06-04T06:00+00:00'),
            risetime=datetime.fromisoformat('2022-06-04T07:00+00:00'),
        )
        self.assertEqual(self.diary.average_sleep_duration, timedelta(hours=7))
        self.assertEqual(self.diary.average_efficiency, 0.7)


