from django.db import models


class SpotifyToken(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=15, null = True, default = '')
    access_token = models.CharField(max_length=150, null = True, default = '')
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50, null = True, default = '')