from django.contrib import admin
import nested_admin # type: ignore[import]


from .models import Module, Page, Section, Input

class SectionAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = Section
    exclude = ('id',)

class PageAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = Page
    inlines = [SectionAdmin,]
    exclude = ('id',)

class ModuleAdmin(nested_admin.NestedModelAdmin): # type: ignore[no-any-unimported]
    inlines = [PageAdmin,]
    exclude = ('id',)

admin.site.register(Module, ModuleAdmin)
