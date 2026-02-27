from django.db import models

class Destination(models.Model):

    TRAVEL_TYPES = [
        ('solo', 'Solo'),
        ('family', 'Family'),
        ('friends', 'Friends'),
        ('couple', 'Couple'),
    ]

    name = models.CharField(max_length=150)
    state = models.CharField(max_length=100)
    description = models.TextField()

    min_budget = models.IntegerField()
    max_budget = models.IntegerField()

    suitable_for = models.CharField(max_length=20, choices=TRAVEL_TYPES)

    image = models.URLField()
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.name

class Hotel(models.Model):
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name="hotels")
    name = models.CharField(max_length=200)
    price_per_night = models.IntegerField()
    rating = models.FloatField()
    image = models.URLField()

    def __str__(self):
        return self.name


class Booking(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    booked_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.hotel.name}"