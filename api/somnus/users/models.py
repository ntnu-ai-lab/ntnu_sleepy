import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

from somnus.modules.models import Answer


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    answers: models.Manager[Answer]
