from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Donation
from decimal import Decimal

class DonationModelTest(TestCase):
    def setUp(self):
        self.donation_data = {
            'name': 'John Doe',
            'email': 'john@example.com',
            'amount': '100.00'
        }
        self.donation = Donation.objects.create(**self.donation_data)

    def test_model_creation(self):
        """Test Donation model creation"""
        self.assertEqual(self.donation.name, 'John Doe')
        self.assertEqual(self.donation.email, 'john@example.com')
        self.assertEqual(self.donation.amount, Decimal('100.00'))
        self.assertIsNotNone(self.donation.created_at)

    def test_string_representation(self):
        """Test string representation"""
        expected = f"John Doe - $100.00"
        self.assertEqual(str(self.donation), expected)

    def test_amount_decimal_places(self):
        """Test amount field decimal places"""
        donation2 = Donation.objects.create(
            name='Jane Doe',
            email='jane@example.com',
            amount='99.99'
        )
        self.assertEqual(donation2.amount, Decimal('99.99'))

    def test_model_ordering(self):
        """Test that records are ordered by -created_at"""
        donation2 = Donation.objects.create(
            name='Jane Doe',
            email='jane@example.com',
            amount='200.00'
        )
        queryset = Donation.objects.all()
        self.assertEqual(queryset.first(), donation2)  # Most recent first


class DonationAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.list_url = reverse('donation-list-create')
        
        # Create a test record
        self.test_data = {
            'name': 'Test User',
            'email': 'test@example.com',
            'amount': '50.00'
        }
        self.donation = Donation.objects.create(**self.test_data)

    def test_get_all_donations(self):
        """Test GET /api/donations/"""
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], self.test_data['name'])
        self.assertEqual(Decimal(response.data[0]['amount']), Decimal('50.00'))

    def test_create_donation(self):
        """Test POST /api/donations/"""
        new_data = {
            'name': 'New Donor',
            'email': 'donor@example.com',
            'amount': '75.50'
        }
        response = self.client.post(
            self.list_url,
            new_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Donation.objects.count(), 2)
        self.assertEqual(Donation.objects.last().name, 'New Donor')
        self.assertEqual(Donation.objects.last().amount, Decimal('75.50'))

    def test_create_donation_invalid_data(self):
        """Test POST with invalid data"""
        invalid_data = {
            'name': '',  # Empty name
            'email': 'invalid-email',  # Invalid email
            'amount': '-50.00'  # Negative amount
        }
        response = self.client.post(
            self.list_url,
            invalid_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_donation_zero_amount(self):
        """Test POST with zero amount"""
        invalid_data = {
            'name': 'Test User',
            'email': 'test@example.com',
            'amount': '0.00'
        }
        response = self.client.post(
            self.list_url,
            invalid_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_donation_large_amount(self):
        """Test POST with very large amount"""
        large_data = {
            'name': 'Rich Donor',
            'email': 'rich@example.com',
            'amount': '9999999.99'
        }
        response = self.client.post(
            self.list_url,
            large_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)