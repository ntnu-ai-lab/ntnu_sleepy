from typing import Any
from rest_framework import viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from django.db import models
import itertools

from .models import Answer, AnswerList, FormSection, ImageSection, Input, Module, Page, Section, TextSection, VideoSection
from .serializers import AnswerSerializer, AnswerListSerializer, FormSectionSerializer, ImageSectionSerializer, InputSerializer, ModuleSerializer, PageSerializer, SectionSerializer, TextSectionSerializer, VideoSectionSerializer

class ModuleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer

class PageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer

class SectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Section.objects.select_subclasses()
    serializers = {
        FormSection: FormSectionSerializer,
        TextSection: TextSectionSerializer,
        ImageSection: ImageSectionSerializer,
        VideoSection: VideoSectionSerializer,
    }

    def list(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        return Response([self.serializers[type(section)](section).data for section in self.queryset])

    def retrieve(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        section = self.queryset.get(id=kwargs.get('pk'))
        return Response(self.serializers[type(section)](section).data)

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