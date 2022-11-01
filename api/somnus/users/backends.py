from typing import Any, Optional
import requests

from django.http import HttpRequest
from django.contrib.auth.backends import BaseBackend
from django_ory_auth.apps import config

from .models import User

HTTP_STATUS_OK = 200
HTTP_STATUS_UNAUTHORIZED = 401

class OryBackend(BaseBackend):
    """Essentially just a rewrite of django_ory_auth except it uses X-Session-Token instead of cookies."""
    def authenticate(self, request: Optional[HttpRequest], **kwargs: Any) -> Optional[User]:
        if request is None:
            return None
        sdk_url = config().get('ORY_SDK_URL')
        sess = requests.get(
            f"{sdk_url}/sessions/whoami",
            headers={'X-Session-Token': request.headers.get('X-Session-Token', '')}
        )
        if sess.status_code != HTTP_STATUS_OK:
            return None
        user_id = sess.json().get('identity', {}).get('id', None)
        if not user_id:
            return None
        user, created = User._default_manager.get_or_create(id=user_id, username=user_id)

        return user
