from django.contrib import admin
from adminsortable2 import admin as sortableadmin # type: ignore[import]

from .models import Question

class DiaryQuestionAdmin(sortableadmin.SortableAdminMixin, admin.ModelAdmin): # type: ignore[no-any-unimported]
    exclude = ('id',)

admin.site.register(Question, DiaryQuestionAdmin)