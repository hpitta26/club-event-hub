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
           'email', 'password'
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
       # added profile picture and banner fields
       fields = [ # expose fields that will be sent in API calls
           'user_id', 'slug', 'user', 'club_name', 'description', 'social_media_handles', 'spirit_rating', 'followers_count', 'events_count', 
           'club_picture',
           'club_banner'
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
       
        #Addded that 

       instance.club_name = validated_data.get('club_name', instance.club_name)
       instance.description = validated_data.get('description', instance.description)
       instance.social_media_handles = validated_data.get('social_media_handles', instance.social_media_handles)
       instance.spirit_rating = validated_data.get('spirit_rating', instance.spirit_rating)

       # added these instances for pfp and profile banner
       instance.profile_picture = validated_data.get('club_picture', None)
       instance.profile_banner = validated_data.get('club_banner', None)

       print(self.context['request'].FILES) 
       print("Received data:", validated_data)


       instance.save() # saves updated instance to the DB
       return instance



class StudentSerializer(serializers.ModelSerializer):
   # Fields not serialized: rsvp_events
   user = UserSerializer()
   class Meta:
       model = Student
       fields = [
           'user_id', 'user', 'major', 'graduation_year', 'spirit_points', 'first_name', 'last_name'
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
    club = ClubSerializer(read_only=True)
    rsvps = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all(), many=True, required=False)
    attending = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            'id', 'club', 'title', 'description', 'start_time', 'end_time', 'location', 'capacity', 'rsvps', 'tags', 'attending'
        ]

    def get_attending(self, event): # get the number of attendees per event
        return event.rsvps.count()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if self.context.get('student_context_rsvps', False): # used to get event cards for students only
            self.fields.pop('rsvps', None)
            self.fields.pop('club', None)
            self.fields['is_rsvped'] = serializers.SerializerMethodField()
            self.fields['host'] = serializers.SerializerMethodField()
            self.fields['coverImage'] = serializers.SerializerMethodField()
            self.fields['hostLogo'] = serializers.SerializerMethodField()

        # if self.context.get('attending', False):
        #     self.fields['attending'] = serializers.SerializerMethodField()

    def get_hostLogo(self, event):
        return ""
        # TO DO

    def get_coverImage(self, event):
        return ""
        # TO DO

    def get_host(self, event): # make a field for the host name of the event
        return event.club.club_name

    def get_is_rsvped(self, event):
        request = self.context.get('request')
        if not request or not request.user or not request.user.is_authenticated:
            return False
        try:
            student = Student.objects.get(user=request.user)
            return event.rsvps.filter(user_id=student.user_id).exists()
        except Student.DoesNotExist:
            return False