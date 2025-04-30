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
            'email', 'password', 'profile_picture'
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
        self.changed_fields = {}

        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
            self.changed_fields['password'] = '********'  # or skip if sensitive

        for field in validated_data:
            new_value = validated_data[field]
            old_value = getattr(instance, field)
            if new_value != old_value:
                setattr(instance, field, new_value)
                self.changed_fields[field] = new_value

        instance.save()
        return instance



class ClubSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    followers_count = serializers.SerializerMethodField()
    events_count = serializers.SerializerMethodField()

    class Meta:
        model = Club
        fields = [
            'user_id', 'slug', 'user', 'club_name', 'description',
            'social_media_handles', 'spirit_rating',
            'followers_count', 'events_count', 'club_banner'
        ]

    def get_followers_count(self, obj):
        return obj.followers.count()

    def get_events_count(self, obj):
        return obj.events.count()

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = UserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        club = Club.objects.create(user=user, **validated_data)
        return club

    def update(self, instance, validated_data):
        self.changed_fields = {}

        # Handle nested user data if present
        user_data = validated_data.pop('user', None)
        if user_data:
            user_serializer = UserSerializer(instance=instance.user, data=user_data, partial=True)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()
            self.changed_fields['user'] = user_serializer.changed_fields if hasattr(user_serializer, 'changed_fields') else True

        fields_to_check = [
            'club_name', 'description', 'social_media_handles',
            'spirit_rating', 'club_banner'
        ]

        for field in fields_to_check:
            if field in validated_data:
                new_value = validated_data[field]
                old_value = getattr(instance, field)
                if new_value != old_value:
                    setattr(instance, field, new_value)
                    self.changed_fields[field] = new_value

        instance.save()
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
        user_data = validated_data.pop('user', None)
        if user_data:
            user_serializer = UserSerializer(instance=instance.user, data=user_data, partial=True)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()
            
        fields_to_check = [
            'first_name', 'last_name',
            'major', 'graduation_year'
        ]

        for field in fields_to_check:
            if field in validated_data:
                new_value = validated_data[field]
                old_value = getattr(instance, field)
                if new_value != old_value:
                    setattr(instance, field, new_value)
                    self.changed_fields[field] = new_value

        instance.save()
        return instance





class EventSerializer(serializers.ModelSerializer):
    club = ClubSerializer(read_only=True)
    rsvps = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all(), many=True, required=False)
    attending = serializers.SerializerMethodField()
    checked_in_students = serializers.PrimaryKeyRelatedField(queryset = Student.objects.all(),many = True, required = False)

    class Meta:
        model = Event
        fields = [
            'id', 'club', 'title', 'description', 'start_time', 'end_time', 'location', 'capacity', 'rsvps', 'tags', 'attending','profilebanner','checked_in_students'
        ]

    def get_attending(self, event): # get the number of attendees per event
        return event.rsvps.count()
    
    def get_is_checked_in(self,event): #check in student
        request = self.context.get('request')
        if not request or not request.user or not request.user.is_authenticated:
            return False
        try:
            student = Student.object.get(user = request.user)
            return event.checked_in_students.filter(user_id = student.user_id).exists()
        except Student.DoesNotExist:
            return False


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if self.context.get('student_context_rsvps', False): # used to get event cards for students only
            self.fields.pop('rsvps', None)
            self.fields.pop('club', None)
            self.fields.pop('checked_in_students',None)
            self.fields['is_rsvped'] = serializers.SerializerMethodField()
            self.fields['is_checked_in'] = serializers.SerializerMethodField()  
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
         