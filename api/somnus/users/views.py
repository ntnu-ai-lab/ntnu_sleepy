from rest_framework import viewsets
from somnus.users.models import User

from django.db.models import QuerySet

from somnus.users.serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    def get_queryset(self) -> QuerySet[User]:
        return User.objects.filter(self.request.user)
