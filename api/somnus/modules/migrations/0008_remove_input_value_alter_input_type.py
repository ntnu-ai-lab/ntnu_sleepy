# Generated by Django 4.1.1 on 2022-10-27 09:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modules', '0007_delete_moduleproxy_alter_answer_input_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='input',
            name='value',
        ),
        migrations.AlterField(
            model_name='input',
            name='type',
            field=models.CharField(choices=[('select', 'Flervalg'), ('text', 'Fritekst'), ('checkbox', 'Avkrysning')], max_length=255),
        ),
    ]
