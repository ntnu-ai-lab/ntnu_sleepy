# Generated by Django 4.1.1 on 2022-09-27 11:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modules', '0002_answerlist_alter_answer_answers_delete_answers'),
    ]

    operations = [
        migrations.AddField(
            model_name='module',
            name='title',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='page',
            name='title',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='section',
            name='rules',
            field=models.CharField(default='true', max_length=255),
        ),
    ]
