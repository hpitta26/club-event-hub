"""
Used to convert between Model Instances and JSON Objects (both ways)
Serialization and Deserialization (writing and reading)
JSON Object is what is sent and received by APIs (in Request and Response Objects)

Returns:
    _type_: _description_
"""
from rest_framework import serializers
from restapi.models import Club, Student, Event, CustomUser


class UserSerializer(serializers.ModelSerializer):
   class Meta:
       model = CustomUser
       fields = [ # Include the user fields you want to expose
           'id', 'email', 'password'
       ]
       extra_kwargs = {
           'password': {'write_only': True},  # Do not return password in responses
       }


   def create(self, validated_data): # override create with hashed password
       password = validated_data.pop('password')
       user = CustomUser(**validated_data)
       user.set_password(password)
       user.save()
       return user


   def update(self, instance, validated_data):
       instance.email = validated_data.get('email', instance.email)
       password = validated_data.get('password', None) # hash new password if user wants to update it
       if password:
           instance.set_password(password)
       instance.save()
       return instance


class ClubSerializer(serializers.ModelSerializer):
   # Fields not serialized: followers, events
   user = UserSerializer()
   followers_count = serializers.SerializerMethodField()
   events_count = serializers.SerializerMethodField()
   class Meta:
       model = Club
       fields = [ # expose fields that will be sent in API calls
           'user_id', 'slug', 'user', 'club_name', 'description', 'social_media_handles', 'spirit_rating', 'followers_count', 'events_count'
       ]


   def get_followers_count(self, obj): # Return the number of students following this club
       return obj.followers.count()
  
   def get_events_count(self, obj): # Return the number of events hosted by this club
       return obj.events.count()


   def create(self, validated_data):
       user_data = validated_data.pop('user') # get nested user data
       user_serializer = UserSerializer(data=user_data) # create the user using the UserSerializer
       user_serializer.is_valid(raise_exception=True)
       user = user_serializer.save()
       club = Club.objects.create(user=user, **validated_data)
       return club


   def update(self, instance, validated_data): # self->serializer, instance->(model instance you are updating), validated_data->(data from the frontend)
       # Update nested user data if provided
       user_data = validated_data.pop('user', None)
       if user_data:
           user_serializer = UserSerializer(instance=instance.user, data=user_data, partial=True)
           user_serializer.is_valid(raise_exception=True)
           user_serializer.save()
       # Update club-specific fields
       instance.club_name = validated_data.get('club_name', instance.club_name)
       instance.description = validated_data.get('description', instance.description)
       instance.social_media_handles = validated_data.get('social_media_handles', instance.social_media_handles)
       instance.spirit_rating = validated_data.get('spirit_rating', instance.spirit_rating)
       instance.save() # saves updated instance to the DB
       return instance



class StudentSerializer(serializers.ModelSerializer):
   # Fields not serialized: rsvp_events
   user = UserSerializer()
   class Meta:
       model = Student
       fields = [
           'user', 'major', 'graduation_year', 'spirit_points', 'first_name', 'last_name'
       ]
  
   def create(self, validated_data):
       user_data = validated_data.pop('user') # get nested user data
       user_serializer = UserSerializer(data=user_data) # create the user using the UserSerializer
       user_serializer.is_valid(raise_exception=True)
       user = user_serializer.save()
       student = Student.objects.create(user=user, **validated_data)
       return student
  
   def update(self, instance, validated_data):
       # Update nested user data if provided
       user_data = validated_data.pop('user', None)
       if user_data:
           user_serializer = UserSerializer(instance=instance.user, data=user_data, partial=True)
           user_serializer.is_valid(raise_exception=True)
           user_serializer.save()
       # Update student-specific fields
       instance.first_name = validated_data.get('first_name', instance.first_name)
       instance.last_name = validated_data.get('last_name', instance.last_name)
       instance.major = validated_data.get('major', instance.major)
       instance.graduation_year = validated_data.get('graduation_year', instance.graduation_year)
       instance.spirit_points = validated_data.get('spirit_points', instance.spirit_points)
       instance.save()
       return instance




class EventSerializer(serializers.ModelSerializer):
   #club = serializers.PrimaryKeyRelatedField(queryset=Club.objects.all())
   club = ClubSerializer(read_only=True)
   rsvps = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all(), many=True, required=False)
   class Meta:
       model = Event
       fields = [
           'id', 'club', 'title', 'description', 'start_time', 'end_time', 'location', 'capacity','rsvps'
       ]