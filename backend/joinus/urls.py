from django.urls import path
from .views import JoinUsListCreateView

urlpatterns = [
    path('', JoinUsListCreateView.as_view(), name='joinus-list-create'),
]