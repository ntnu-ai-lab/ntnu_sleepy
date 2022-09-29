import uuid
from django.utils.translation import gettext_lazy as _
from django.db import models

from somnus.users.models import User

class Module(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField(default='', max_length=255)
    pages: models.Manager['Page']
    ordering = models.PositiveIntegerField(
        default=0,
        blank=False,
        null=False,
        db_index=True,
    )

    class Meta:
        ordering = ['ordering']

class Page(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField(default='', max_length=255)
    module = models.ForeignKey(to=Module, related_name='pages', on_delete=models.CASCADE)
    sections: models.Manager['Section']
    ordering = models.PositiveIntegerField(
        default=0,
        blank=False,
        null=False,
        db_index=True,
    )

    class Meta:
        ordering = ['ordering']

class Section(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    rules = models.CharField(max_length=255, default='true')
    heading = models.CharField(max_length=255, blank=True)
    content = models.TextField(blank=True)
    page = models.ForeignKey(to=Page, related_name='sections', on_delete=models.CASCADE)
    ordering = models.PositiveIntegerField(
        default=0,
        blank=False,
        null=False,
        db_index=True,
    )

    class Meta:
        ordering = ['ordering']


class TextSection(Section):
    pass

class FormSection(Section):
    form: models.Manager['Input']
    answer_lists: models.Manager['AnswerList']

class ImageSection(Section):
    uri = models.CharField(max_length=255, blank=True)

class VideoSection(Section):
    uri = models.CharField(max_length=255, blank=True)


class Input(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    type = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    label = models.CharField(max_length=255)
    helptext = models.CharField(max_length=255)
    value = models.CharField(max_length=255, blank=True)
    section = models.ForeignKey(to=FormSection, related_name='form', on_delete=models.CASCADE)
    ordering = models.PositiveIntegerField(
        default=0,
        blank=False,
        null=False,
        db_index=True,
    )
    answers: models.Manager['Answer']

    class Meta:
        ordering = ['ordering']

class AnswerList(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    section = models.ForeignKey(to=FormSection, related_name='answer_lists', on_delete=models.CASCADE)
    user = models.ForeignKey(to=User, related_name='answer_lists', on_delete=models.CASCADE)
    answers: models.Manager['Answer']

class Answer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    input = models.ForeignKey(to=Input, related_name='answer', on_delete=models.CASCADE)
    answer_list = models.ForeignKey(to=AnswerList, related_name='answers', on_delete=models.CASCADE)
    value = models.CharField(max_length=255)
