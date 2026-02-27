from rest_framework import serializers
from .models import JoinUs
import re

class JoinUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = JoinUs
        fields = ['id', 'full_name', 'email', 'phone', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_full_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Full name must be at least 2 characters long")
        if not re.match(r'^[A-Za-z\s\'-]+$', value):
            raise serializers.ValidationError("Full name can only contain letters, spaces, hyphens and apostrophes")
        return value.strip()

    def validate_email(self, value):
        if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', value):
            raise serializers.ValidationError("Enter a valid email address")
        return value.lower()

    def validate_phone(self, value):
        # Ghana phone number validation (basic)
        cleaned = re.sub(r'[\s\-\(\)]', '', value)
        if not re.match(r'^(\+233|0)[0-9]{9}$', cleaned):
            raise serializers.ValidationError("Enter a valid Ghana phone number (e.g., 0244123456 or +233244123456)")
        return value

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long")
        return value.strip()