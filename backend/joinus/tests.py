from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import JoinUs
import json

class JoinUsModelTest(TestCase):
    def setUp(self):
        self.joinus_data = {
            'full_name': 'John Doe',
            'email': 'john@example.com',
            'phone': '0244123456',
            'message': 'I want to join the foundation'
        }
        self.joinus = JoinUs.objects.create(**self.joinus_data)

    def test_model_creation(self):
        """Test JoinUs model creation"""
        self.assertEqual(self.joinus.full_name, 'John Doe')
        self.assertEqual(self.joinus.email, 'john@example.com')
        self.assertEqual(self.joinus.phone, '0244123456')
        self.assertEqual(self.joinus.message, 'I want to join the foundation')
        self.assertIsNotNone(self.joinus.created_at)

    def test_string_representation(self):
        """Test string representation"""
        expected = f"John Doe - john@example.com"
        self.assertEqual(str(self.joinus), expected)

    def test_model_ordering(self):
        """Test that records are ordered by -created_at"""
        joinus2 = JoinUs.objects.create(
            full_name='Jane Doe',
            email='jane@example.com',
            phone='0244987654',
            message='Another message'
        )
        queryset = JoinUs.objects.all()
        self.assertEqual(queryset.first(), joinus2)  # Most recent first


class JoinUsAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.list_url = reverse('joinus-list-create')
        
        # Create a test record
        self.test_data = {
            'full_name': 'Test User',
            'email': 'test@example.com',
            'phone': '0555123456',
            'message': 'Test message'
        }
        self.joinus = JoinUs.objects.create(**self.test_data)

    def test_get_all_joinus(self):
        """Test GET /api/joinus/"""
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['full_name'], self.test_data['full_name'])

    def test_create_joinus(self):
        """Test POST /api/joinus/"""
        new_data = {
            'full_name': 'New User',
            'email': 'new@example.com',
            'phone': '0277123456',
            'message': 'New join request'
        }
        response = self.client.post(
            self.list_url,
            new_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(JoinUs.objects.count(), 2)
        self.assertEqual(JoinUs.objects.last().full_name, 'New User')

    def test_create_joinus_invalid_data(self):
        """Test POST with invalid data"""
        invalid_data = {
            'full_name': '',  # Empty name
            'email': 'invalid-email',  # Invalid email
            'phone': '123',  # Too short
            'message': ''  # Empty message
        }
        response = self.client.post(
            self.list_url,
            invalid_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_joinus_missing_fields(self):
        """Test POST with missing required fields"""
        incomplete_data = {
            'full_name': 'Test User'
            # Missing email, phone, message
        }
        response = self.client.post(
            self.list_url,
            incomplete_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)