from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Club, Student, Event

# Used to convert between Model Instances and JSON Objects (both ways)
# Serialization and Deserialization (writing and reading)
# JSON Object is what is sent and received by APIs (in Request and Response Objects)


