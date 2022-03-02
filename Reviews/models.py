from enum import Flag
from django.db import models
from AddSongs.models import SongsName
from accounts.models import UserAccount

from django.core.exceptions import ValidationError
from textblob import TextBlob

def validate_reviews(reviews):
    result = TextBlob(reviews).sentiment.polarity
    if(result==0):
        print("do not save")
        raise ValidationError("Invalid Reviews")
    else:
        print("save")


class UserReviews(models.Model):
    song_data = models.ForeignKey(SongsName,related_name='song_data',on_delete=models.CASCADE)
    first_name = models.CharField(max_length=200,null=False,blank=False)
    user_id = models.CharField(max_length=200,null=False,blank=False)
    reviews = models.CharField(max_length=200,validators=[validate_reviews],null=False)
    category = models.CharField(max_length=20,null=False)

    def __str__(self):
        return self.id
    class Meta:
        ordering = ['id']