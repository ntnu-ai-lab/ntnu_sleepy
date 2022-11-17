from typing import Any, Literal, Optional

from django.db import models

from somnus.users.models import Profile


class UserRouter:
    """
    A router to control all database operations on models in the
    users application   .
    """
    route_models: set[Any] = { Profile }

    def db_for_read(self, model: models.Model, **hints: Any) -> Optional[Literal['profile_db']]:
        """
        Attempts to read users models go to profile_db.
        """
        if type(model) in self.route_models:
            return 'profile_db'
        return None

    def db_for_write(self, model: models.Model, **hints: Any) -> Optional[Literal['profile_db']]:
        """
        Attempts to write users models go to profile_db.
        """
        if type(model) in self.route_models:
            return 'profile_db'
        return None

    def allow_relation(self, obj1: models.Model, obj2: models.Model, **hints: Any) -> Optional[bool]:
        """
        Allow relations if a model in the users app is
        involved.
        """
        if (
            type(obj1) in self.route_models or
            type(obj2) in self.route_models
        ):
           return True
        return None

    def allow_migrate(self, db: str, app_label: str, model_name: Optional[str] = None, **hints: Any) -> Optional[bool]:
        """
        Make sure the users app only appear in the profile_db database.
        """
        if model_name in [model.__name__ for model in self.route_models]:
            return db == 'profile_db'
        return None