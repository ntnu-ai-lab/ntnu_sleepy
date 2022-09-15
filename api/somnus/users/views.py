from rest_framework import viewsets, views
from rest_framework.response import Response
from somnus.users.models import User

from somnus.users.serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class AdminsViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_staff=True)

class TestView(views.APIView):
    def get(self, request):
        print(request.headers)
        print(request.user)
        return Response()