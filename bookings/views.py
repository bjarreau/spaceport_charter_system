from django.http import JsonResponse
from .models import Ship, Booking
from datetime import datetime, timedelta, time

# Create your views here.
def get_ships(request):
    ships = list(Ship.objects.values('id', 'name'))
    return JsonResponse(ships, safe=False)
    
def get_ship_bookings(request, ship_id):
    bookings = list(
        Booking.objects.filter(shipId = ship_id).values('id', 'startTime', 'endTime')
    )
    return JsonResponse(bookings, safe=False)
    
def get_ship_availability(request, ship_id):
    date_str = request.GET.get("date")
    if not date_str:
        return JsonResponse({"error": "date is required"}, status=400)
        
    date = datetime.strptime(date_str, "%Y-%m-%d").date()
    
    start_time = datetime.combine(date, time(6, 0))
    end_time = datetime.combine(date, time(22, 0))
    
    #compute slots in 30 minute increments - seems reasonable 
    slots = []
    t = start_time
    while t <= end_time:
        slots.append(t.strftime("%H:%M"))
        t += timedelta(minutes=30)
    
    #get all bookings for selected date
    bookings = Booking.objects.filter(shipId = ship_id, startTime__date = date)
    
    #block off the 30 minutes after each booking, plus booking time
    blocked = set()
    for b in bookings:
        t = b.startTime
        end = b.endTime + timedelta(minutes=30)
        while t <= end:
            blocked.add(t.strftime("%H:%M"))
            t += timedelta(minutes=30)
            
    free = [s for s in slots if s not in blocked]
    return JsonResponse({
        "date": date_str,
        "free": free,
        "blocked": sorted(list(blocked))
    })