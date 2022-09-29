from django.contrib import admin
import nested_admin # type: ignore[import]
from adminsortable2 import admin as sortableadmin # type: ignore[import]


from .models import Module, Page, Section, TextSection, FormSection, ImageSection, VideoSection, Input


class ImageSectionAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = ImageSection
    exclude = ('ordering',)


class VideoSectionAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = VideoSection
    exclude = ('ordering',)
class TextSectionAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = TextSection
    exclude = ('ordering',)

class InputAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = Input
    exclude = ('ordering',)

class FormSectionAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = FormSection
    inlines = [InputAdmin]
    exclude = ('ordering',)

class SectionAdminSortable(sortableadmin.SortableStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = Section
class PageAdminNested(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = Page
    inlines = [TextSectionAdmin, FormSectionAdmin, ImageSectionAdmin, VideoSectionAdmin]
    exclude = ('ordering',)

class PageAdminSortable(sortableadmin.SortableStackedInline): # type: ignore[no-any-unimported]
    model = Page
    extra = 0
    show_change_link = True
    can_delete = False

class PageAdmin(sortableadmin.SortableAdminMixin, admin.ModelAdmin): # type: ignore[no-any-unimported]
    exclude = ['id']
    inlines = [SectionAdminSortable]

class ModuleAdmin(nested_admin.NestedModelAdmin): # type: ignore[no-any-unimported]
    inlines = [PageAdminNested,]
    exclude = ('ordering',)

class ModuleProxy(Module):
    class Meta:
        proxy = True
        verbose_name = 'Module ordering'
        verbose_name_plural = 'Module Ordering'

class ModuleAdminList(sortableadmin.SortableAdminMixin, admin.ModelAdmin): # type: ignore[no-any-unimported]
    exclude = ['id']
    inlines = [PageAdminSortable]
    show_change_link = True
    
    

admin.site.register(Module, ModuleAdmin)
admin.site.register(ModuleProxy, ModuleAdminList)
admin.site.register(Page, PageAdmin)
