from rest_framework import viewsets
from somnus.users.models import User

from somnus.users.serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class AdminsViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_staff=True)