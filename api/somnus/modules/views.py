from rest_framework import viewsets
from django.db import models

from .models import Answer, AnswerList, Input, Module, Page, Section
from .serializers import AnswerSerializer, AnswerListSerializer, ChildSectionSerializer, InputSerializer, ModuleSerializer, PageSerializer

class ModuleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer

class PageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer

class SectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Section.objects.select_subclasses()
    serializer_class = ChildSectionSerializer

class AnswerListViewSet(viewsets.ModelViewSet):
    def get_queryset(self) -> models.QuerySet[AnswerList]:
        return AnswerList.objects.filter(user=self.request.user)
    serializer_class = AnswerListSerializer

class AnswerViewSet(viewsets.ModelViewSet):
    def get_queryset(self) -> models.QuerySet[Answer]:
        return super().get_queryset()
    serializer_class = AnswerSerializer

class InputViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Input.objects.all()
    serializer_class = InputSerializer