# Generated by Django 4.1.1 on 2022-11-10 13:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modules', '0012_quizsection_quizquestion_quizoption'),
    ]

    operations = [
        migrations.AddField(
            model_name='rule',
            name='name',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='rulegroup',
            name='name',
            field=models.CharField(default='', max_length=255),
        ),
    ]
