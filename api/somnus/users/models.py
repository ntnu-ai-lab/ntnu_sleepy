from django.utils import timezone
from typing import TYPE_CHECKING, Any

import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.auth.base_user import BaseUserManager as BaseUserManager
from django.contrib.auth.models import UserManager
from django.utils.translation import gettext_lazy as _


if TYPE_CHECKING:
    from somnus.modules.models import Answer # Otherwise we get circular imports
    from somnus.sleepdiary.models import SleepDiary, SleepRestrictionPlan

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
    password = models.CharField(blank=True, max_length=255, default='')
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
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

    answers: models.Manager['Answer']
    diary: models.Manager['SleepDiary']
    sleep_restriction_plan: models.Manager['SleepRestrictionPlan']

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    @property
    def details(self) -> 'Profile | None':
        try:
            details: Profile = Profile.objects.get(id=self.id)
            return details
        except Profile.DoesNotExist:
            return None

    def __str__(self) -> str:
        try:
            details = Profile.objects.get(id=self.id)
            return f"{details.name if details.name else self.username}{f' ({details.email})' if details.email else ''}"
        except Profile.DoesNotExist:
            return f"{self.username}"

class Profile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=255, blank=True)
    email = models.EmailField(_("email address"), blank=True)
    dateOfBirth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=Gender.choices, default=Gender.UNDEFINED)
    occupation = models.CharField(max_length=255, blank=True)
    relationshipstatus = models.CharField(max_length=20, choices=Relationshipstatus.choices, default=Relationshipstatus.UNDEFINED)

    def __str__(self) -> str:
         return f"{self.name if self.name else self.id}{f' ({self.email})' if self.email else ''}"

