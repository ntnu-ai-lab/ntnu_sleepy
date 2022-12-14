# Generated by Django 4.1.1 on 2022-11-03 11:53

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('modules', '0010_alter_answerlist_unique_together'),
    ]

    operations = [
        migrations.CreateModel(
            name='InputOption',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('label', models.CharField(default='', max_length=255)),
                ('value', models.CharField(default='', max_length=255)),
                ('input', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='options', to='modules.input')),
            ],
        ),
    ]
