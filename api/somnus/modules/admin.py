from django.contrib import admin
import nested_admin # type: ignore[import]
from adminsortable2 import admin as sortableadmin # type: ignore[import]


from .models import Module, Page, Part, Section, TextSection, FormSection, ImageSection, VideoSection, Input


class ImageSectionAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = ImageSection
    exclude = ('ordering', 'id')


class VideoSectionAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = VideoSection
    exclude = ('ordering', 'id')
class TextSectionAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = TextSection
    exclude = ('ordering', 'id')

class InputAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = Input
    exclude = ('ordering', 'id')

class FormSectionAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = FormSection
    inlines = [InputAdmin]
    exclude = ('ordering', 'id')

class SectionAdminSortable(sortableadmin.SortableStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = Section
    exclude = ('id',)
class PageAdminNested(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = Page
    inlines = [TextSectionAdmin, FormSectionAdmin, ImageSectionAdmin, VideoSectionAdmin]
    exclude = ('ordering', 'id')

class PageAdminSortable(sortableadmin.SortableStackedInline): # type: ignore[no-any-unimported]
    model = Page
    extra = 0
    show_change_link = True
    can_delete = False

class PageAdmin(sortableadmin.SortableAdminMixin, admin.ModelAdmin): # type: ignore[no-any-unimported]
    exclude = ['id']
    inlines = [SectionAdminSortable]

class PartAdminNested(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = Part
    inlines = [PageAdminNested]
    exclude = ('ordering', 'id')

class PartAdminSortable(sortableadmin.SortableStackedInline): # type: ignore[no-any-unimported]
    model = Part
    extra = 0
    show_change_link = True
    cal_delete = False

class PartAdmin(sortableadmin.SortableAdminMixin, admin.ModelAdmin): # type: ignore[no-any-unimported]
    exclude = ('id',)
    inlines = [PageAdminSortable]


class PartProxy(Part):
    class Meta:
        proxy = True
        verbose_name = 'Part ordering'
        verbose_name_plural = 'Parts Ordering'

class PartAdminList(sortableadmin.SortableAdminMixin, admin.ModelAdmin): # type: ignore[no-any-unimported]
    exclude = ['id']
    inlines = [PageAdminSortable]
    show_change_link = True

class ModuleAdmin(nested_admin.NestedModelAdmin): # type: ignore[no-any-unimported]
    inlines = [PartAdminNested,]
    exclude = ('ordering', 'id')

class ModuleProxy(Module):
    class Meta:
        proxy = True
        verbose_name = 'Module ordering'
        verbose_name_plural = 'Module Ordering'

class ModuleAdminList(sortableadmin.SortableAdminMixin, admin.ModelAdmin): # type: ignore[no-any-unimported]
    exclude = ['id']
    inlines = [PartAdminSortable]
    show_change_link = True
    
    

admin.site.register(Module, ModuleAdmin)
admin.site.register(ModuleProxy, ModuleAdminList)
admin.site.register(PartProxy, PartAdminList)
admin.site.register(Page, PageAdmin)
