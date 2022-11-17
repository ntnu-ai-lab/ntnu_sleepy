from rest_framework import viewsets
from somnus.users.models import User, Profile

from django.db.models import QuerySet

from somnus.users.serializers import UserSerializer, ProfileSerializer

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer
    def get_queryset(self) -> QuerySet[User]:
        return User.objects.filter(id=self.request.user.id) # type: ignore[union-attr]


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    def get_queryset(self) -> QuerySet[Profile]:
        return Profile.objects.filter(id=self.request.user.id) # type: ignore[union-attr]
    
    def get_object(self) -> Profile:
        if self.request.method == 'PATCH':
            object: Profile
            object, _ = Profile.objects.get_or_create(id=self.kwargs.get('pk'))
            return object
        return super().get_object() # type: ignore[no-any-return]
