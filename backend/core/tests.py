from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

class CoreURLsTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_admin_url_exists(self):
        """Test admin URL is accessible"""
        response = self.client.get('/admin/')
        # Should redirect to login page (302) or return 200
        self.assertIn(response.status_code, [200, 302])

    def test_api_root_not_defined(self):
        """Test that API root doesn't exist (we haven't defined it)"""
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_joinus_url_resolves(self):
        """Test joinus URL resolves correctly"""
        url = reverse('joinus-list-create')
        self.assertEqual(url, '/api/joinus/')

    def test_donations_url_resolves(self):
        """Test donations URL resolves correctly"""
        url = reverse('donation-list-create')
        self.assertEqual(url, '/api/donations/')