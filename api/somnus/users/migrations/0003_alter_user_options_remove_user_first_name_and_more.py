# Generated by Django 4.1.1 on 2022-10-05 13:16

from django.db import migrations, models


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
            name='last_name',
        ),
        migrations.AddField(
            model_name='user',
            name='dateOfBirth',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='gender',
            field=models.CharField(choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other'), ('undefined', 'Undefined')], default='undefined', max_length=10),
        ),
        migrations.AddField(
            model_name='user',
            name='occupation',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='user',
            name='relationshipstatus',
            field=models.CharField(choices=[('married', 'Married'), ('coliving', 'Coliving'), ('relationship', 'Relationship'), ('single', 'Single'), ('undefined', 'Undefined')], default='undefined', max_length=20),
        ),
        migrations.AlterField(
            model_name='user',
            name='is_superuser',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
