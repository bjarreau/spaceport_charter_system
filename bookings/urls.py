"""
URL configuration for spaceport_charter_system project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from .views import get_ships, get_ship_bookings, get_ship_availability, get_dashboard_data, CreateBooking

urlpatterns = [
    path('ships/', get_ships),
    path('ships/<int:ship_id>/bookings/', get_ship_bookings),
    path('ships/book/', CreateBooking.as_view()),
    path('ships/<int:ship_id>/availability/', get_ship_availability),
    path("ships/dashboard/", get_dashboard_data),
]
