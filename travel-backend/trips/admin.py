from django.contrib import admin
from .models import Booking, Destination, Hotel

admin.site.register(Destination)
admin.site.register(Hotel)
admin.site.register(Booking)