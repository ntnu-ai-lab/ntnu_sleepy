from typing import Any
from rest_framework import serializers
from rest_flex_fields import FlexFieldsModelSerializer

from .models import Answer, AnswerList, FormSection, ImageSection, Input, Module, Page, Part, Rule, RuleGroup, Section, TextSection, VideoSection

class RuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rule
        fields = ['id', 'input', 'comparator', 'value', 'should_be']

    def to_representation(self, instance: Rule) -> Any:
        try:
            instance.evaluate(self.context['request'].user)
            return None
        except Answer.DoesNotExist:
            return super().to_representation(instance)


class RuleGroupSerializer(serializers.ModelSerializer):
    rules = serializers.SerializerMethodField('get_rule_serializer')
    class Meta:
        model = RuleGroup
        fields = ['id', 'rules']
        depth = 1

    def to_representation(self, instance: RuleGroup) -> Any:
        try:
            instance.evaluate(self.context['request'].user, catch=False)
            return None
        except Answer.DoesNotExist:
            return super().to_representation(instance)


    def get_rule_serializer(self, obj: RuleGroup) -> Any:
        serializer_context = {'request': self.context.get('request') }
        children = Rule.objects.all().filter(rule_group=obj)
        serializer = RuleSerializer(children, many=True, context=serializer_context)
        return serializer.data

class InputSerializer(serializers.ModelSerializer[Input]):
    rules = serializers.SerializerMethodField('get_rule_group_serializer')
    class Meta:
        model = Input
        fields = ['type', 'name', 'label', 'helptext', 'value', 'answers', 'rules']

    def to_representation(self, instance: Input) -> Any:
        return super().to_representation(instance) if instance.evaluate_rules(self.context['request'].user) else None

    def get_rule_group_serializer(self, obj: Input) -> Any:
        serializer_context = {'request': self.context.get('request') }
        children = RuleGroup.objects.all().filter(input=obj)
        serializer = RuleGroupSerializer(children, many=True, context=serializer_context)
        return serializer.data

class SectionSerializer(serializers.ModelSerializer[Section]):
    rules = serializers.SerializerMethodField('get_rule_group_serializer')
    class Meta:
        model = Section
        fields = ['id', 'heading', 'content', 'type', 'rules']
    
    def get_rule_group_serializer(self, obj: Section) -> Any:
        serializer_context = {'request': self.context.get('request') }
        children = RuleGroup.objects.all().filter(section=obj)
        serializer = RuleGroupSerializer(children, many=True, context=serializer_context)
        return serializer.data


class TextSectionSerializer(SectionSerializer):
    class Meta(SectionSerializer.Meta):
        model = TextSection

class ImageSectionSerializer(SectionSerializer):
    class Meta(SectionSerializer.Meta):
        model = ImageSection
        fields = SectionSerializer.Meta.fields + ['uri']

class VideoSectionSerializer(SectionSerializer):
    class Meta(SectionSerializer.Meta):
        model = VideoSection
        fields = SectionSerializer.Meta.fields + ['uri']

class FormSectionSerializer(FlexFieldsModelSerializer[FormSection]): # type: ignore[no-any-unimported]
    rules = serializers.SerializerMethodField('get_rule_group_serializer')
    expandable_fields = {
        'form': (InputSerializer) 
    }
    class Meta(SectionSerializer.Meta):
        model = FormSection
        fields = SectionSerializer.Meta.fields + ['form']

    def get_rule_group_serializer(self, obj: FormSection) -> Any:
        serializer_context = {'request': self.context.get('request') }
        children = RuleGroup.objects.all().filter(section=obj)
        serializer = RuleGroupSerializer(children, many=True, context=serializer_context)
        return serializer.data

class ChildSectionSerializer(serializers.Serializer):
    serializers = {
        FormSection: FormSectionSerializer,
        TextSection: TextSectionSerializer,
        ImageSection: ImageSectionSerializer,
        VideoSection: VideoSectionSerializer,
    }
    def to_representation(self, instance: Section) -> Any:
        section = Section.objects.get_subclass(id=instance.id) if type(instance) == Section else instance
        return self.serializers[type(section)](section, context=self.context).data if section.evaluate_rules(self.context['request'].user) else None

class PageSerializer(FlexFieldsModelSerializer[Page]): # type: ignore [no-any-unimported]
    class Meta:
        model = Page
        fields = ['id', 'title', 'part', 'sections']

    expandable_fields = {
        'sections': (ChildSectionSerializer, {'many': True})
    }

class PartSerializer(FlexFieldsModelSerializer[Part]): # type: ignore[no-any-unimported]
    class Meta:
        model = Part
        fields = ['id', 'title', 'module', 'pages']

    expandable_fields = {
        'pages': (PageSerializer, {'many': True})
    }


class ModuleSerializer(FlexFieldsModelSerializer[Module]): # type: ignore [no-any-unimported]
    class Meta:
        model = Module
        fields = ['id', 'title', 'parts']
    
    expandable_fields = {
        'parts': (PartSerializer, {'many': True})
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

