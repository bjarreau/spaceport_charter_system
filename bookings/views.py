from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.timezone import make_aware
from .models import Ship, Booking
from datetime import datetime, timedelta, time

# Create your views here.
def get_ships(request):
    ships = list(Ship.objects.values('id', 'name'))
    return JsonResponse(ships, safe=False)

def get_dashboard_data(request):
    ships = Ship.objects.all().order_by("name")
    bookings = Booking.objects.select_related("shipId").order_by("startTime")

    # Group bookings by shipId
    grouped = {}
    for ship in ships:
        grouped[ship.id] = {
            "shipId": ship.id,
            "shipName": ship.name,
            "bookings": []
        }

    for b in bookings:
        grouped[b.shipId.id]["bookings"].append({
            "id": b.id,
            "date": b.startTime.date().isoformat(),
            "startTime": b.startTime.strftime("%H:%M"),
            "endTime": b.endTime.strftime("%H:%M"),
            "pilot": b.pilotName,
        })

    return JsonResponse({"ships": list(grouped.values())})
    
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
    
class CreateBooking(APIView):
    def post(self, request):
        data = request.data

        ship_id = data.get("shipId")
        start_str = data.get("startTime")
        duration = data.get("durationMinutes")
        pilot = data.get("pilotName", "")
        
        #check the required data
        if not ship_id or not start_str or not duration:
            return Response({"error": "Missing required fields"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        #check the time format
        try:
            start = make_aware(datetime.fromisoformat(start_str))
        except:
            return Response({"error": "Invalid startTime format"},
                status=status.HTTP_400_BAD_REQUEST
            )

        end = start + timedelta(minutes=duration)
        
        #check the hours
        if start.hour < 6 or end.hour > 22 or (end.hour == 22 and end.minute > 0):
            return Response({"error": "Outside operating hours"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        #check that refill buffer
        buffer_end = end + timedelta(minutes=30)
        overlapping = Booking.objects.filter(
            shipId=ship_id,
            startTime__lt=buffer_end,
            endTime__gt=start
        )
        
        if overlapping.exists():
            return Response({"error": "Time slot unavailable"},
                status=status.HTTP_409_CONFLICT
            )
        
        #if we made it this far, we are good to book
        booking = Booking.objects.create(
            shipId_id=ship_id,
            pilotName=pilot,
            startTime=start,
            endTime=end
        )

        return Response({"success": True, "bookingId": booking.id},
            status=status.HTTP_201_CREATED
        )