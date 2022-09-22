from rest_framework import serializers
from rest_flex_fields import FlexFieldsModelSerializer

from .models import Answer, AnswerList, Input, Module, Page, Section

class InputSerializer(serializers.ModelSerializer[Input]):
    class Meta:
        model = Input
        fields = ['type', 'name', 'label', 'helptext', 'value', 'answers', 'section']

class SectionSerializer(FlexFieldsModelSerializer[Section]): # type: ignore [no-any-unimported]
    class Meta:
        model = Section
        fields = ['id', 'type', 'heading', 'content', 'uri', 'form', 'page']

    expandable_fields = {
        'form': (InputSerializer) 
    }


class PageSerializer(FlexFieldsModelSerializer[Page]): # type: ignore [no-any-unimported]
    class Meta:
        model = Page
        fields = ['id', 'module', 'sections']

    expandable_fields = {
        'sections': (SectionSerializer, {'many': True})
    }


class ModuleSerializer(FlexFieldsModelSerializer[Module]): # type: ignore [no-any-unimported]
    class Meta:
        model = Module
        fields = ['id', 'pages']
    
    expandable_fields = {
        'pages': (PageSerializer, {'many': True})
    }


class AnswerSerializer(serializers.ModelSerializer[Answer]):
    class Meta:
        model = Answer
        fields = ['id', 'input', 'answers', 'value']

class AnswerListSerializer(FlexFieldsModelSerializer[AnswerList]): # type: ignore [no-any-unimported]
    class Meta:
        model = AnswerList
        fields = ['id', 'section', 'user', 'answers']

    expandable_fields = {
        'answers': (AnswerSerializer)
    }

