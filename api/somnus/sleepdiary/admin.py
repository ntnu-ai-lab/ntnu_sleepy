from django.contrib import admin

from .models import DiaryEntry, SleepDiary, SleepRestrictionPlan

class DiaryEntryStackedInline(admin.StackedInline):
    extra = 0
    model = DiaryEntry
    exclude = ('id',)
class SleepDiaryAdmin(admin.ModelAdmin):
    inlines = [DiaryEntryStackedInline]
    exclude = ('id',)

class SleepRestrictionAdmin(admin.ModelAdmin):
    exclude = ('id',)

admin.site.register(SleepDiary, SleepDiaryAdmin)
admin.site.register(SleepRestrictionPlan, SleepRestrictionAdmin)