# Generated by Django 4.1.1 on 2022-10-04 12:09

from django.db import migrations, models

import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_user_name'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='user',
            options={},
        ),
        migrations.RemoveField(
            model_name='user',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='groups',
        ),
        migrations.RemoveField(
            model_name='user',
            name='is_superuser',
        ),
        migrations.RemoveField(
            model_name='user',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='user_permissions',
        ),
        migrations.AddField(
            model_name='user',
            name='dateOfBirth',
            field=models.DateField(blank=True, default=datetime.datetime.fromtimestamp(0)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='gender',
            field=models.CharField(choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other'), ('undefined', 'Undefined')], default='male', max_length=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='relationshipstatus',
            field=models.CharField(choices=[('married', 'Married'), ('coliving', 'Coliving'), ('relationship', 'Relationship'), ('single', 'Single'), ('undefined', 'Undefined')], default='single', max_length=20),
            preserve_default=False,
        ),
    ]