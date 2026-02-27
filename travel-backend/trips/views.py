from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response({"message": "User created successfully"})

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = User.objects.filter(username=username).first()

    if user and user.check_password(password):
        refresh = RefreshToken.for_user(user)

        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        })

    return Response({"error": "Invalid credentials"}, status=400)



from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Destination
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_suggestions(request):

    budget = request.data.get('budget')
    travel_type = request.data.get('travel_type')

    destinations = Destination.objects.filter(
        min_budget__lte=budget,
        max_budget__gte=budget,
        suitable_for=travel_type
    )

    results = []

    for dest in destinations:
        results.append({
            "id": dest.id,
            "name": dest.name,
            "state": dest.state,
            "description": dest.description,
            "image": dest.image,
            "latitude": dest.latitude,
            "longitude": dest.longitude
        })

    return Response(results)

import requests

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def nearby_hotels(request):

    lat = request.GET.get('lat')
    lng = request.GET.get('lng')

    api_key = "YOUR_GOOGLE_API_KEY"

    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius=5000&type=lodging&key={api_key}"

    response = requests.get(url)
    return Response(response.json())

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_destination(request, id):
    dest = Destination.objects.get(id=id)

    return Response({
        "id": dest.id,
        "name": dest.name,
        "description": dest.description,
        "image": dest.image,
        "latitude": dest.latitude,
        "longitude": dest.longitude
    })
from .models import Hotel, Booking

@api_view(['GET'])
def get_hotels(request, destination_id):
    hotels = Hotel.objects.filter(destination_id=destination_id)

    data = []
    for hotel in hotels:
        data.append({
            "id": hotel.id,
            "name": hotel.name,
            "price_per_night": hotel.price_per_night,
            "rating": hotel.rating,
            "image": hotel.image
        })

    return Response(data)

@api_view(['POST'])
def book_hotel(request):
    hotel = request.data.get("hotel")   # ✅ FIXED
    name = request.data.get("name")
    email = request.data.get("email")
    phone = request.data.get("phone")

    booking = Booking.objects.create(
        hotel_id=hotel,   # ✅ correct usage
        name=name,
        email=email,
        phone=phone
    )

    return Response({"message": "Hotel booked successfully"}, status=201)