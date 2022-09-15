from typing import Any, Optional
from django_ory_auth.backend import OryBackend
from rest_framework.request import Request

class AuthBackend(OryBackend): # type: ignore

    def authenticate(self, request: Request) -> Optional[Any]:
        print(request.COOKIES)
        print(request.headers.get('X-Session-Token', ''))
        request.COOKIES['ory_kratos_session'] = request.headers.get('X-Session-Token', '')
        res = super().authenticate(request)
        print(res)
        return res