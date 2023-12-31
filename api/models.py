from django.db import models
import string
import random

#Generates random and unique code for each room
def generate_unique_code():
    length = 6
    while True:
        code  =  ''.join(random.choices(string.ascii_uppercase, k = length))
        if Room.objects.filter(code=code).count() == 0:
            break
    return code

# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=8,  default=generate_unique_code, unique=True) #code for each room
    host = models.CharField(max_length=50, unique=True) #room host
    guest_can_pause = models.BooleanField(null=False, default = False) 
    votes_to_skip = models.IntegerField(null=False, default=1)
    votes_to_previous = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True) #Time of creation
    current_song = models.CharField(max_length=50, null = True)
    