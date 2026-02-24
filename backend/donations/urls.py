from django.urls import path
from .views import DonationListCreateView

urlpatterns = [
    path('', DonationListCreateView.as_view(), name='donation-list-create'),    
]