from pyexpat import model
import uuid
from django.db import models
from django.contrib.auth import models as auth_models


class User(auth_models.AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)