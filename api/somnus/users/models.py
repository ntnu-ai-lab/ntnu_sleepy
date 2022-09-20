from typing import TYPE_CHECKING

import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

if TYPE_CHECKING:
    from somnus.modules.models import Answer # Otherwise we get circular imports



class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=255, default='')
    answers: models.Manager['Answer']
