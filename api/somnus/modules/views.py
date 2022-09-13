from rest_framework import viewsets

from .models import Answer, Answers, Input, Module, Page, Section
from .serializers import AnswerSerializer, AnswersSerializer, InputSerializer, ModuleSerializer, PageSerializer, SectionSerializer

class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer

class PageViewSet(viewsets.ModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer

class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer

class AnswersViewSet(viewsets.ModelViewSet):
    queryset = Answers.objects.all()
    serializer_class = AnswersSerializer

class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

class InputViewSet(viewsets.ModelViewSet):
    queryset = Input.objects.all()
    serializer_class = InputSerializer