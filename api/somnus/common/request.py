from rest_framework.request import Request

from somnus.users.models import User

class AuthenticatedRequest(Request):
    user: User