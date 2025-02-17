from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth.models import User
from .models import Event, Student, Club
from .serializers import EventSerializer, StudentSerializer, ClubSerializer

