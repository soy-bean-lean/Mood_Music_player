from enum import Flag
from django.db import models
from AddSongs.models import SongsName
from accounts.models import UserAccount

class UserReviews(models.Model):
    song_data = models.ForeignKey(SongsName,related_name='song_data',on_delete=models.CASCADE)
    first_name = models.CharField(max_length=200,null=False,blank=False)
    user_id = models.CharField(max_length=200,null=False,blank=False)
    reviews = models.CharField(max_length=200,null=False)
    category = models.CharField(max_length=20,null=False)

    def __str__(self):
        return self.id
    class Meta:
        ordering = ['id']