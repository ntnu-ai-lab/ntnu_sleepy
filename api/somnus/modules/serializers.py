from rest_framework import serializers

from .models import Answer, Answers, Input, Module, Page, Section


class ModuleSerializer(serializers.ModelSerializer[Module]):
    class Meta:
        model = Module
        fields = ['id', 'pages']


class PageSerializer(serializers.ModelSerializer[Page]):
    class Meta:
        model = Page
        fields = ['id', 'module', 'sections']

class SectionSerializer(serializers.ModelSerializer[Section]):
    class Meta:
        model = Section
        fields = ['id', 'rules', 'type', 'heading', 'content', 'uri', 'form', 'page']

class AnswersSerializer(serializers.ModelSerializer[Answers]):
    class Meta:
        model = Answers
        fields = ['id', 'section', 'user', 'answers']

class AnswerSerializer(serializers.ModelSerializer[Answer]):
    class Meta:
        model = Answer
        fields = ['id', 'input', 'answers', 'value']

class InputSerializer(serializers.ModelSerializer[Input]):
    class Meta:
        model = Input
        fields = ['type', 'name', 'label', 'helptext', 'value', 'answer', 'section']