from django.contrib import admin
import nested_admin # type: ignore[import]
from adminsortable2 import admin as sortableadmin # type: ignore[import]


from .models import Module, Page, Part, Rule, RuleGroup, Section, TextSection, FormSection, ImageSection, VideoSection, Input

class RulesAdminSection(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = Rule
    exclude = ('id',)

class RulesAdminInput(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = Rule
    exclude = ('id',)


class RuleGroupsAdminSection(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = RuleGroup
    inlines = (RulesAdminSection,)
    exclude = ('id', 'input')

class RuleGroupsAdminInput(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = RuleGroup
    inlines = (RulesAdminInput,)
    exclude = ('id', 'section')


class ImageSectionAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = ImageSection
    inlines = (RuleGroupsAdminSection,)
    exclude = ('ordering', 'id')


class VideoSectionAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = VideoSection
    inlines = (RuleGroupsAdminSection,)
    exclude = ('ordering', 'id')
class TextSectionAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = TextSection
    inlines = (RuleGroupsAdminSection,)
    exclude = ('ordering', 'id')

class InputAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = Input
    inlines = (RuleGroupsAdminInput,)
    exclude = ('id',)

class FormSectionAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = FormSection
    inlines = [InputAdmin, RuleGroupsAdminSection]
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
    search_fields = ['title']
    list_filter = ('part', 'part__module')
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

class PartAdmin(nested_admin.NestedModelAdmin): # type: ignore[no-any-unimported]
    exclude = ('id', 'ordering', 'module')
    inlines = [PageAdminNested]
    show_change_link = True

class ModuleAdminList(sortableadmin.SortableAdminMixin, admin.ModelAdmin): # type: ignore[no-any-unimported]
    exclude = ['id', 'ordering']
    inlines = [PartAdminSortable]
    show_change_link = True
    
    

admin.site.register(Module, ModuleAdminList)
admin.site.register(Part, PartAdmin)
admin.site.register(Page, PageAdmin)
