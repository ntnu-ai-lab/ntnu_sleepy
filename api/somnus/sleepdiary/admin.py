from django.contrib import admin

from .models import SleepDiary

class SleepDiaryAdmin(admin.ModelAdmin):
    exclude = ('id',)

admin.site.register(SleepDiary, SleepDiaryAdmin)