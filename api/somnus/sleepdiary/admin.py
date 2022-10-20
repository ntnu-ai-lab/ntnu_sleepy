from django.contrib import admin

from .models import DiaryEntry, SleepDiary

class DiaryEntryStackedInline(admin.StackedInline):
    extra = 0
    model = DiaryEntry
    exclude = ('id',)
class SleepDiaryAdmin(admin.ModelAdmin):
    inlines = [DiaryEntryStackedInline]
    exclude = ('id',)

admin.site.register(SleepDiary, SleepDiaryAdmin)