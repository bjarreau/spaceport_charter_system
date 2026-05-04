from django.http import JsonResponse
from .models import Ship, Booking

# Create your views here.
def get_ships(request):
    ships = list(Ship.objects.values('id', 'name'))
    return JsonResponse(ships, safe=False)
    
def get_ship_bookings(request, ship_id):
    bookings = list(
        Booking.objects.filter(shipId = ship_id).values('id', 'startTime', 'endTime')
    )
    return JsonResponse(bookings, safe=False)