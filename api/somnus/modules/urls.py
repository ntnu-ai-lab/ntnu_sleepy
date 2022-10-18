from rest_framework_nested import routers
from django.urls import path, include

from .views import AnswerViewSet, AnswerListViewSet, InputViewSet, ModuleViewSet, PageViewSet, PartViewSet, SectionViewSet

router = routers.SimpleRouter()
router.register(r'pages', PageViewSet)
router.register(r'sections', SectionViewSet)
router.register(r'inputs', InputViewSet)
router.register(r'answer-lists', AnswerListViewSet, basename='answer_lists')
router.register(r'answers', AnswerViewSet, basename='answers')
router.register('', ModuleViewSet)

modules_router = routers.NestedSimpleRouter(router, '', lookup='module')
modules_router.register(r'parts', PartViewSet)

parts_router = routers.NestedSimpleRouter(modules_router, r'parts', lookup='part')
parts_router.register(r'pages', PageViewSet)

pages_router = routers.NestedSimpleRouter(parts_router, r'pages', lookup='page')
pages_router.register(r'sections', SectionViewSet)

sections_router = routers.NestedSimpleRouter(pages_router, r'sections', lookup='section')
sections_router.register(r'inputs', InputViewSet)
sections_router.register(r'answer-lists', AnswerListViewSet, basename='answer_lists')

inputs_router = routers.NestedSimpleRouter(sections_router, r'inputs', lookup='input')
inputs_router.register(r'answers', AnswerViewSet, basename='answers')
answer_lists_router = routers.NestedSimpleRouter(sections_router, r'answer-lists', lookup='answer_list')
answer_lists_router.register(r'answers', AnswerViewSet, basename='answers')


urlpatterns = [
    path('', include(router.urls)),
    path('', include(modules_router.urls)),
    path('', include(parts_router.urls)),
    path('', include(pages_router.urls)),
    path('', include(sections_router.urls)),
    path('', include(inputs_router.urls)),
    path('', include(answer_lists_router.urls)),
]