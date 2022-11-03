from typing import Any, Type
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.db import models

from .models import Answer, AnswerList, Input, Module, Page, Part, Section
from .serializers import AnswerListReadSerializer, AnswerListWriteSerializer, AnswerSerializer, AnswerListSerializer, ChildSectionSerializer, InputSerializer, ModuleSerializer, PageSerializer, PartSerializer

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
    
    def get_serializer_class(self) -> Type[AnswerListSerializer]:
        if self.request.method in ['GET']:
            return AnswerListReadSerializer
        return AnswerListWriteSerializer

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        request.data.update({'user': request.user.id}) # type: ignore[union-attr]
        return super().create(request, *args, **kwargs)

class AnswerViewSet(viewsets.ModelViewSet):
    def get_queryset(self) -> models.QuerySet[Answer]:
        return Answer.objects.filter(answer_list__user=self.request.user)
    serializer_class = AnswerSerializer

class InputViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Input.objects.all()
    serializer_class = InputSerializer