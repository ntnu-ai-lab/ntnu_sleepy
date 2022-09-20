import requests

from rest_framework.request import Request
from django.contrib.auth import get_user_model
from django.conf import settings
from django.contrib.auth.backends import BaseBackend
from django_ory_auth.apps import config

UserModel = get_user_model()
HTTP_STATUS_OK = 200
HTTP_STATUS_UNAUTHORIZED = 401

class OryBackend(BaseBackend):
    """Essentially just a rewrite of django_ory_auth except it uses X-Session-Token instead of cookies."""
    def authenticate(self, request: Request):
        sdk_url = config().get('ORY_SDK_URL')
        sess = requests.get(
            f"{sdk_url}/sessions/whoami",
            headers=request.headers
        )
        if sess.status_code != HTTP_STATUS_OK:
            return None
        user_id = sess.json().get('identity', {}).get('id', None)
        if not user_id:
            return None
        user, created = UserModel._default_manager.get_or_create(
            **{UserModel.USERNAME_FIELD: user_id, 'id': user_id}
        )

        return user
