from django.contrib import admin
import nested_admin # type: ignore[import]


from .models import Module, Page, TextSection, FormSection, ImageSection, VideoSection, Input


class ImageSectionAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = ImageSection
    exclude = ('id',)


class VideoSectionAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = VideoSection
    exclude = ('id',)
class TextSectionAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = TextSection
    exclude = ('id',)

class InputAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = Input
    exclude = ('id',)

class FormSectionAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = FormSection
    inlines = [InputAdmin]
    exclude = ('id',)

class PageAdmin(nested_admin.NestedStackedInline): # type: ignore[no-any-unimported]
    extra = 0
    model = Page
    inlines = [TextSectionAdmin, FormSectionAdmin, ImageSectionAdmin, VideoSectionAdmin]
    exclude = ('id',)

class ModuleAdmin(nested_admin.NestedModelAdmin): # type: ignore[no-any-unimported]
    inlines = [PageAdmin,]
    exclude = ('id',)

admin.site.register(Module, ModuleAdmin)
