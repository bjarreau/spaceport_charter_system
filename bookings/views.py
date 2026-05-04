from django.http import JsonResponse
from .models import Ship

# Create your views here.
def get_ships(request):
    ships = list(Ship.objects.values('id', 'name'))
    return JsonResponse(ships, safe=False)