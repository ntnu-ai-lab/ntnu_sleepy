from django.test import TestCase

from .models import Module, Page

class ModuleTestCase(TestCase):
    module: Module
    page: Page

    def setUp(self) -> None:
        self.module = Module.objects.create()
        self.page = Page.objects.create(module=self.module)

    # The next two tests are trivial, and are meant mostly as a demonstration.

    def test_can_get_module_from_page(self) -> None:
        self.assertEqual(self.module, self.page.module)

    # Remember that all test methods need to be named test_*
    def test_can_get_page_from_module(self) -> None:
        self.assertEquals(self.page, self.module.pages.get(id=self.page.id))
