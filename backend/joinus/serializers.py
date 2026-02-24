from rest_framework import serializers
from .models import JoinUs

class JoinUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = JoinUs
        fields = ['id', 'full_name', 'email', 'phone', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']