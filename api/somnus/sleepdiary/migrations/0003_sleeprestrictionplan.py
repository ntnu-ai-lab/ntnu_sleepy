# Generated by Django 4.1.1 on 2022-10-25 12:47

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('sleepdiary', '0002_alter_diaryentry_options_alter_diaryentry_date_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='SleepRestrictionPlan',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('custom_rise_time', models.TimeField(default=datetime.time(7, 0, tzinfo=datetime.timezone.utc))),
                ('duration', models.IntegerField(default=300)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='sleep_restriction_plan', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
