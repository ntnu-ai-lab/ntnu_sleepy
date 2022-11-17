from django.contrib import admin

from .models import User, Profile

class UserAdmin(admin.ModelAdmin):
    class Meta:
        exclude = ('id',)

class ProfileAdmin(admin.ModelAdmin):
    class Meta:
        exclude = ('id',)

admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)