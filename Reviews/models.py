from django.db import models
from AddSongs.models import SongsName
from accounts.models import UserAccount

class UserReviews(models.Model):
    ID = models.ForeignKey(SongsName,related_name='ID',on_delete=models.CASCADE)
    first_name = models.CharField(max_length=200,null=False,blank=False)
    reviews = models.CharField(max_length=200,null=False)
    category = models.CharField(max_length=20,null=False)

    def __str__(self):
        return self.ID
    class Meta:
        ordering = ['ID']