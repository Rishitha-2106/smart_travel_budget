
from django.urls import path
from .views import book_hotel, get_destination, get_hotels, get_suggestions, login, nearby_hotels, register

urlpatterns = [
    path('register/', register),
    path('login/', login),
    path('suggestions/', get_suggestions),
    path('nearby-hotels/', nearby_hotels),
    path('destination/<int:id>/', get_destination),
    path('hotels/<int:destination_id>/', get_hotels),
    path('book-hotel/', book_hotel),
]

