from rest_framework import viewsets
from django.db import models

from .models import Answer, AnswerList, Input, Module, Page, Part, Section
from .serializers import AnswerSerializer, AnswerListSerializer, ChildSectionSerializer, InputSerializer, ModuleSerializer, PageSerializer, PartSerializer

class ModuleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer

class PageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer

class PartViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Part.objects.all()
    serializer_class = PartSerializer

class SectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Section.objects.select_subclasses()
    serializer_class = ChildSectionSerializer

class AnswerListViewSet(viewsets.ModelViewSet):
    def get_queryset(self) -> models.QuerySet[AnswerList]:
        return AnswerList.objects.filter(user=self.request.user)
    serializer_class = AnswerListSerializer

class AnswerViewSet(viewsets.ModelViewSet):
    def get_queryset(self) -> models.QuerySet[Answer]:
        return Answer.objects.filter(answer_list__user=self.request.user)
    serializer_class = AnswerSerializer

class InputViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Input.objects.all()
    serializer_class = InputSerializer