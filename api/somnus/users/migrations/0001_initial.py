# Generated by Django 4.1 on 2022-09-13 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('is_admin', models.BooleanField(default=False)),
            ],
        ),
    ]
