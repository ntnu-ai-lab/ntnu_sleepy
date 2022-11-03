from cgitb import text
import operator
from typing import Any, Callable
import uuid
from django.utils.translation import gettext_lazy as _
from django.db import models
from model_utils.managers import InheritanceManager # type: ignore[import]

from somnus.users.models import User

class Module(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(default='', max_length=255)
    parts: models.Manager['Part']
    ordering = models.PositiveIntegerField(
        default=0,
        blank=False,
        null=False,
        db_index=True,
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['ordering']

class Part(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(default='', max_length=255)
    module = models.ForeignKey(to=Module, related_name='parts', on_delete=models.CASCADE)
    min_duration = models.IntegerField(default=0, help_text='Minimum time in hours before the user can go to the next part')
    pages: models.Manager['Page']
    ordering = models.PositiveIntegerField(
        default=0,
        blank=False,
        null=False,
        db_index=True,
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['ordering']

class Page(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(default='', max_length=255)
    part = models.ForeignKey(to=Part, related_name='pages', on_delete=models.CASCADE)
    sections: models.Manager['Section']
    ordering = models.PositiveIntegerField(
        default=0,
        blank=False,
        null=False,
        db_index=True,
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['ordering']

class Section(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    heading = models.CharField(max_length=255, blank=True)
    content = models.TextField(blank=True)
    page = models.ForeignKey(to=Page, related_name='sections', on_delete=models.CASCADE)
    ordering = models.PositiveIntegerField(
        default=0,
        blank=False,
        null=False,
        db_index=True,
    )

    objects = InheritanceManager()
    type = 'none'

    rules: models.Manager['RuleGroup']

    def evaluate_rules(self, user: User) -> bool:
        return any([group.evaluate(user) for group in self.rules.all()]) if self.rules.all() else True

    def __str__(self) -> str:
        return self.heading

    class Meta:
        ordering = ['ordering']


class TextSection(Section):
    type = 'text'

class FormSection(Section):
    type = 'form'
    form: models.Manager['Input']
    answer_lists: models.Manager['AnswerList']

class ImageSection(Section):
    type = 'img'
    uri = models.CharField(max_length=255, blank=True)

class VideoSection(Section):
    type = 'video'
    uri = models.CharField(max_length=255, blank=True)


class Input(models.Model):
    class InputType(models.TextChoices):
        select = 'select', 'Flervalg'
        text = 'text', 'Fritekst'
        checkbox = 'checkbox', 'Avkrysning'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=255, choices=InputType.choices)
    name = models.CharField(max_length=255)
    label = models.CharField(max_length=255)
    helptext = models.CharField(max_length=255)
    section = models.ForeignKey(to=FormSection, related_name='form', on_delete=models.CASCADE)
    ordering = models.PositiveIntegerField(
        default=0,
        blank=False,
        null=False,
        db_index=True,
    )
    answers: models.Manager['Answer']
    rules : models.Manager['RuleGroup']
    options: models.Manager['InputOption']

    def evaluate_rules(self, user: User) -> bool:
        return any([group.evaluate(user) for group in self.rules.all()]) if self.rules.all() else True

    def __str__(self) -> str:
        return self.name

    class Meta:
        ordering = ['ordering']

class InputOption(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    input = models.ForeignKey(Input, related_name='options', on_delete=models.CASCADE)
    label = models.CharField(max_length=255, default='')
    value = models.CharField(max_length=255, default='')

class AnswerList(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    section = models.ForeignKey(to=FormSection, related_name='answer_lists', on_delete=models.CASCADE)
    user = models.ForeignKey(to=User, related_name='answer_lists', on_delete=models.CASCADE)
    answers: models.Manager['Answer']

    class Meta:
        unique_together = ('section', 'user')

class Answer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    input = models.ForeignKey(to=Input, related_name='answers', on_delete=models.CASCADE)
    answer_list = models.ForeignKey(to=AnswerList, related_name='answers', on_delete=models.CASCADE)
    value = models.CharField(max_length=255)

class RuleGroup(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    section = models.ForeignKey(to=Section, related_name='rules', default=None, null=True, blank=True, on_delete=models.CASCADE)
    input = models.ForeignKey(to=Input, related_name='rules', default=None, null=True, blank=True, on_delete=models.CASCADE)

    rules: models.Manager['Rule']

    def evaluate(self, user: User, **kwargs: Any) -> bool:
        try:
            return all([rule.evaluate(user) for rule in self.rules.all()])
        except Answer.DoesNotExist:
            if not kwargs.get('catch', True):
                raise Answer.DoesNotExist
            return True

class Rule(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    class Comparator(models.TextChoices):
        eq = 'eq', 'Equals'
        ne = 'ne', 'Not equals'
        gt = 'gt', 'Greater than'
        lt = 'lt', 'Less than'
        ge = 'ge', 'Greater or equals'
        le = 'le', 'Less or equals'
    input = models.ForeignKey(to=Input, related_name='dependents', on_delete=models.CASCADE)
    comparator = models.CharField(max_length=2, choices=Comparator.choices)
    value = models.CharField(max_length=255)
    should_be = models.BooleanField(default=True, verbose_name='Should be True')

    rule_group = models.ForeignKey(to=RuleGroup, related_name='rules', on_delete=models.CASCADE)

    def evaluate(self, user: User) -> bool:
        comparator: Callable[[str, str], bool] = getattr(operator, self.comparator) 
        return comparator(self.input.answers.get(answer_list__user=user).value, self.value)

