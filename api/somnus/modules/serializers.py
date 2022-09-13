from rest_framework import serializers

from .models import Module, Page, Section


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