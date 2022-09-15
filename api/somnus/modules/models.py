import uuid
from django.utils.translation import gettext_lazy as _
from django.db import models

from somnus.users.models import User

class Module(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    pages: models.Manager['Page']

class Page(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    module = models.ForeignKey(to=Module, related_name='pages', on_delete=models.CASCADE)
    sections: models.Manager['Section']

class Section(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    rules = models.CharField(max_length=255)
    heading = models.CharField(max_length=255, blank=True)
    content = models.TextField(blank=True)
    uri = models.CharField(max_length=255, blank=True)
    page = models.ForeignKey(to=Page, related_name='sections', on_delete=models.CASCADE)
    form: models.Manager['Input']
    answer_lists: models.Manager['AnswerList']

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
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    type = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    label = models.CharField(max_length=255)
    helptext = models.CharField(max_length=255)
    value = models.CharField(max_length=255, blank=True)
    section = models.ForeignKey(to=Section, related_name='form', on_delete=models.CASCADE)
    answers: models.Manager['Answer']

class AnswerList(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    section = models.ForeignKey(to=Section, related_name='answer_lists', on_delete=models.CASCADE)
    user = models.ForeignKey(to=User, related_name='answer_lists', on_delete=models.CASCADE)
    answers: models.Manager['Answer']

class Answer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    input = models.ForeignKey(to=Input, related_name='answer', on_delete=models.CASCADE)
    answers = models.ForeignKey(to=AnswerList, related_name='answers', on_delete=models.CASCADE)
    value = models.CharField(max_length=255)
