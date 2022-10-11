# Generated by Django 4.1.1 on 2022-10-11 13:10

import datetime
from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='SleepDiary',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('started_date', models.DateField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='sleep_diary', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='DiaryEntry',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateField(default=datetime.date.today)),
                ('day_rating', models.IntegerField()),
                ('naps', django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.DateTimeField(), size=2), blank=True, size=100)),
                ('notes', models.TextField(default='')),
                ('sleep_quality', models.IntegerField(default=0)),
                ('bedtime', models.DateTimeField(blank=True, null=True)),
                ('lights_out', models.DateTimeField(blank=True, null=True)),
                ('time_to_sleep', models.IntegerField(default=0)),
                ('night_wakes', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), blank=True, null=True, size=30)),
                ('waketime', models.DateTimeField(blank=True, null=True)),
                ('risetime', models.DateTimeField(blank=True, null=True)),
                ('diary', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='entry', to='sleepdiary.sleepdiary')),
            ],
            options={
                'unique_together': {('date', 'diary')},
            },
        ),
    ]
