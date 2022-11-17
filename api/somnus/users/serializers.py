from pyexpat import model
from rest_framework import serializers

from somnus.users.models import User, Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'is_staff', 'is_superuser', 'username']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['name', 'email', 'dateOfBirth','gender', 'relationshipstatus', 'occupation']