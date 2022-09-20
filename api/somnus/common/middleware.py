from rest_framework.request import Request
from rest_framework.response import Response

def mobile_csrf_middleware(get_response):
    def middleware(request: Request) -> Response:
        if (request.headers.get('X-Session-Token')):
            setattr(request, '_dont_enforce_csrf_checks', True)
        return get_response(request)
    return middleware
