from typing import Any
from rest_framework import serializers
from rest_flex_fields import FlexFieldsModelSerializer

from .models import Answer, AnswerList, FormSection, ImageSection, Input, Module, Page, Section, TextSection, VideoSection

class InputSerializer(serializers.ModelSerializer[Input]):
    class Meta:
        model = Input
        fields = ['type', 'name', 'label', 'helptext', 'value', 'answers', 'section']

class SectionSerializer(serializers.ModelSerializer[Section]):
    class Meta:
        model = Section
        fields = ['id', 'heading', 'content', 'page', 'type']


class TextSectionSerializer(serializers.ModelSerializer[TextSection]):
    class Meta(SectionSerializer.Meta):
        model = TextSection

class ImageSectionSerializer(serializers.ModelSerializer[ImageSection]):
    class Meta(SectionSerializer.Meta):
        model = ImageSection
        fields = SectionSerializer.Meta.fields + ['uri']

class VideoSectionSerializer(serializers.ModelSerializer[VideoSection]):
    class Meta(SectionSerializer.Meta):
        model = VideoSection
        fields = SectionSerializer.Meta.fields + ['uri']

class FormSectionSerializer(FlexFieldsModelSerializer[FormSection]): # type: ignore[no-any-unimported]
    expandable_fields = {
        'form': (InputSerializer) 
    }
    class Meta(SectionSerializer.Meta):
        model = FormSection
        fields = SectionSerializer.Meta.fields + ['form']

class ChildSectionSerializer(serializers.Serializer):
    serializers = {
        FormSection: FormSectionSerializer,
        TextSection: TextSectionSerializer,
        ImageSection: ImageSectionSerializer,
        VideoSection: VideoSectionSerializer,
    }
    def to_representation(self, instance: Section) -> Any:
        section = Section.objects.get_subclass(id=instance.id) if type(instance) == Section else instance
        return self.serializers[type(section)](section).data

class PageSerializer(FlexFieldsModelSerializer[Page]): # type: ignore [no-any-unimported]
    class Meta:
        model = Page
        fields = ['id', 'module', 'sections']

    expandable_fields = {
        'sections': (ChildSectionSerializer, {'many': True})
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
        fields = ['id', 'input', 'answer_list', 'value']

class AnswerListSerializer(FlexFieldsModelSerializer[AnswerList]): # type: ignore [no-any-unimported]
    class Meta:
        model = AnswerList
        fields = ['id', 'section', 'user', 'answers']

    expandable_fields = {
        'answers': (AnswerSerializer)
    }

