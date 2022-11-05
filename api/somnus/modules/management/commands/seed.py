from logging import Logger
from typing import Any, Literal
from django.core.management.base import BaseCommand
import random

from ...models import Module, Page, Part, TextSection

logger = Logger(__name__)

# python manage.py seed --mode=refresh

""" Clear all data and creates addresses """
MODE_REFRESH = 'refresh'

""" Clear all data and do not create any object """
MODE_CLEAR = 'clear'

class Command(BaseCommand):
    help = "seed database for testing and development."

    def add_arguments(self, parser: Any) -> None:
        parser.add_argument('--mode', type=str, help="Mode")

    def handle(self, *args: Any, **options: Any) -> None:
        self.stdout.write('seeding data...')
        run_seed(self, options['mode'])
        self.stdout.write('done.')


def clear_data() -> None:
    """Deletes all the table data"""
    logger.info("Delete Module instances")
    Module.objects.all().delete()

titles = ['Lorem Ipsum', 'Overskrift', 'Se Dette', 'Nå Skal Du']
contents = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam scelerisque, est vel blandit interdum, nulla turpis sollicitudin nunc, ac maximus ante nibh ut nulla. Pellentesque auctor magna ut lectus iaculis facilisis. Ut vehicula id nibh sit amet varius. Nullam nibh mi, interdum vel sollicitudin ut, pretium sed quam. Proin laoreet dolor et malesuada congue. Fusce euismod sit amet neque ac bibendum. In mollis posuere fringilla. Fusce imperdiet cursus nunc, non tincidunt risus congue vitae. Etiam elementum nisl finibus, convallis ligula molestie, gravida odio. Nulla facilisi. Ut suscipit venenatis ultrices. Morbi tincidunt lectus sed odio tristique dictum. ', 'Mauris aliquam mi vel nisl facilisis, a imperdiet purus suscipit. Integer lacinia in ex vitae pharetra. Sed feugiat mi lacus, a sodales dui tempus et. Integer eu est hendrerit, sagittis risus sit amet, faucibus erat. Sed non odio ante. Maecenas vel hendrerit libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec condimentum sem vel ornare sagittis. Cras eget sodales est. Nullam tempor lectus non elit feugiat scelerisque. Nullam dignissim id leo vel bibendum. Donec mollis, arcu nec consectetur viverra, odio lectus posuere felis, ut dignissim eros mauris eget est. Donec eget feugiat justo. Vivamus at augue ipsum. Ut lacinia tempus fringilla. Donec sollicitudin, elit et feugiat tempus, orci erat convallis lorem, sed pretium augue ex eu lacus.', ' Morbi eget accumsan magna. Nulla ut risus ullamcorper, iaculis mi at, elementum orci. Phasellus tristique elementum sem, quis tempus lectus eleifend sit amet. Fusce nec massa venenatis, ornare justo quis, sodales tellus. Curabitur id massa a enim posuere feugiat. Nullam vitae scelerisque leo. Duis condimentum cursus eros, id gravida felis rhoncus nec. Nam fringilla libero ante, nec molestie massa mattis eget. ', ' Nam id mattis lorem. Donec consequat velit at tellus tincidunt, vel euismod velit aliquet. Cras vitae quam placerat, scelerisque nisl nec, elementum ligula. Praesent massa tellus, porta eu dui ac, pulvinar lobortis mi. Aenean luctus bibendum diam vel fringilla. Duis lacinia neque in orci malesuada, rhoncus placerat purus gravida. Aenean diam ex, pretium eget nulla faucibus, viverra fringilla velit. Quisque eu nibh ullamcorper, iaculis nibh sed, convallis nisl. Suspendisse pretium placerat tellus sed tincidunt. ', ' Aliquam erat volutpat. In a augue a ex pulvinar varius id sit amet dolor. Vestibulum sit amet nibh ullamcorper nisi laoreet laoreet. Quisque molestie nibh id dolor lacinia, a ullamcorper dolor vulputate. Duis tempor mauris vel dignissim convallis. Vivamus eget ante lectus. Quisque lobortis dolor sed ultrices porta. Duis vitae enim auctor, pulvinar nisi ut, maximus magna. Nunc sit amet neque imperdiet, maximus sapien eget, pellentesque nisl.']

def create_module(i: int) -> Module:
    """Creates a module object combining different elements from the list"""
    logger.info("Creating module")

    module = Module(
        title=random.choice(titles),
        ordering=i
    )
    module.save()
    logger.info("{} address created.".format(module))
    return module

def create_part(module: Module, i: int) -> Part:
    """Creates a Part object"""
    part = Part(
        module=module,
        title=random.choice(titles),
        ordering=i,
    )
    part.save()
    return part

def create_page(part: Part, i: int) -> Page:
    """Creates a page object"""
    page = Page(
        part=part,
        title=random.choice(titles),
        ordering=i,
    )
    page.save()
    return page

def create_textsection(page: Page, i: int) -> TextSection:
    """Creates a text section object"""
    section = TextSection(
        page=page,
        heading=random.choices(titles)[0],
        content=random.choices(contents)[0],
        ordering=i,
    )
    section.save()
    return section


def run_seed(self: Any, mode: Literal['clear'] | Literal['refresh'] | None) -> None:
    """ Seed database based on mode

    :param mode: refresh / clear 
    :return:
    """
    # Clear data from tables
    clear_data()
    if mode == MODE_CLEAR:
        return

    # Creating 4 modules
    for i in range(2):
        module = create_module(i)
        for j in range(2):
            part = create_part(module, j)
            for k in range(2):
                page = create_page(part, k)
                for l in range(2):
                    create_textsection(page, l)