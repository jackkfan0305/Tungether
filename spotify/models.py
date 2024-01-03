from django.db import models
from api.models import Room

class SpotifyToken(models.Model):
    user = models.CharField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(null = True, default = '')
    access_token = models.CharField(null = True, default = '')
    expires_in = models.DateTimeField()
    token_type = models.CharField(null = True, default = '')

class Vote(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    song_id = models.CharField(max_length=50)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)

class VotePrevious(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    song_id = models.CharField(max_length=50)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)