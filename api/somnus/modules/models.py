from django.utils.translation import gettext_lazy as _
from django.db import models

from somnus.users.models import User

class Module(models.Model):
    id = models.AutoField(primary_key=True)

class Page(models.Model):
    id = models.AutoField(primary_key=True)
    module = models.ForeignKey(to=Module, related_name='pages', on_delete=models.CASCADE)

class Section(models.Model):
    id = models.AutoField()
    rules = models.CharField()
    heading = models.CharField()
    content = models.TextField()
    uri = models.CharField()
    page = models.ForeignKey(to=Page, related_name='sections', on_delete=models.CASCADE)

    class Types(models.TextChoices):
        FORM = 'form', _('Form')
        TEXT = 'text', _('Text')
        IMG = 'img', _('Image')
        VIDEO = 'video', _('Video')

    type = models.CharField(
        max_length=5,
        choices=Types.choices,
        default=Types.TEXT
    )

class Input(models.Model):
    id = models.AutoField(primary_key=True)
    type = models.CharField()
    name = models.CharField()
    label = models.CharField()
    helptext = models.CharField()
    value = models.CharField()
    section = models.ForeignKey(to=Section, related_name='form', on_delete=models.CASCADE)

class Answers(models.Model):
    id = models.AutoField(primary_key=True)
    section = models.ForeignKey(to=Section, related_name='answers', on_delete=models.CASCADE)
    user = models.ForeignKey(to=User, related_name='answers', on_delete=models.CASCADE)

class Answer(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.ForeignKey(to=Input, to_field='name', related_name='answers', on_delete=models.DO_NOTHING)
    answers = models.ForeignKey(to=Answers, related_name='answers', on_delete=models.CASCADE)
    value = models.CharField()