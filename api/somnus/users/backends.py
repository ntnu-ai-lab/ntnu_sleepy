from typing import Any, Optional
from django_ory_auth.backend import OryBackend
from rest_framework.request import Request

class AuthBackend(OryBackend): # type: ignore

    def authenticate(self, request: Request) -> Optional[Any]:
        request.COOKIES['ory_kratos_session'] = request.headers.get('X-Session-Cookie', '')
        return super().authenticate(request)