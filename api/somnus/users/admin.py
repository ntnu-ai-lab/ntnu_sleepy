from django.contrib import admin

from .models import User

class UserAdmin(admin.ModelAdmin):
    class Meta:
        exclude = ('id',)

admin.site.register(User, UserAdmin)