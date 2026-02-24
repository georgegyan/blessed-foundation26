from rest_framework import generics
from .models import JoinUs
from .serializers import JoinUsSerializer

class JoinUsListCreateView(generics.ListCreateAPIView):
    queryset = JoinUs.objects.all()
    serializer_class = JoinUsSerializer