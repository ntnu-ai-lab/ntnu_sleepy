from django.db import models


class User():
    id = models.AutoField(primary_key=True)
    admin = models.BooleanField(default=False)
    pass