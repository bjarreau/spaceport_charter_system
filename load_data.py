import json
import django
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "spaceport_charter_system.settings")
django.setup()

from bookings.models import Ship

with open("bookings/fixtures/seed.json") as f:
    raw = json.load(f)

for item in raw:
    Ship.objects.update_or_create(
        id=item["id"],
        defaults={"name": item["name"]}
    )

print("Loaded ships!")
