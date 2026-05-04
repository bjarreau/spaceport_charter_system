from django.db import models

# Create your models here.
class Ship(models.Model):
    name = models.CharField(max_length=100, unique=True)

class Booking(models.Model):
    shipId = models.ForeignKey(Ship, on_delete=models.CASCADE, related_name='bookings')
    pilotName = models.CharField(max_length=100)
    startTime = models.DateTimeField(null=True, blank=True)
    endTime = models.DateTimeField(null=True, blank=True)