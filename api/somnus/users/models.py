from django.utils import timezone
from typing import TYPE_CHECKING

import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.auth.base_user import BaseUserManager as BaseUserManager
from django.contrib.auth.models import UserManager
from django.utils.translation import gettext_lazy as _


if TYPE_CHECKING:
    from somnus.modules.models import Answer # Otherwise we get circular imports
    from somnus.sleepdiary.models import SleepDiary

class Gender(models.TextChoices):
        MALE = ("male")
        FEMALE = ("female")
        OTHER = ("other")
        UNDEFINED = ("undefined")
class Relationshipstatus(models.TextChoices):
        MARRIED = ("married")
        COLIVING = ("coliving")
        RELATIONSHIP = ("relationship")
        SINGLE = ("single")
        UNDEFINED = ("undefined")

""" class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=255, default='')
    dateOfBirth = models.DateField()
    gender = models.CharField(max_length=1, choices=Gender.choices)
    relationshipstatus = models.CharField(max_length=1, choices=Relationshipstatus.choices)
    email = models.EmailField()
    answers: models.Manager['Answer'] """


class User(AbstractBaseUser, PermissionsMixin):
    """
    An abstract base class implementing a fully featured User model with
    admin-compliant permissions.
    Username and password are required. Other fields are optional.
    """

    username_validator = UnicodeUsernameValidator()
    name = models.CharField(max_length=255, blank=True)
    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    email = models.EmailField(_("email address"), blank=True)
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    dateOfBirth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=Gender.choices, default=Gender.UNDEFINED)
    occupation = models.CharField(max_length=255, blank=True)
    relationshipstatus = models.CharField(max_length=20, choices=Relationshipstatus.choices, default=Relationshipstatus.UNDEFINED)
    answers: models.Manager['Answer']
    diary: models.Manager['SleepDiary']

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]
