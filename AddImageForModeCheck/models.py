from django.db import models
# from django.core.exceptions import ValidationError

class AddImageForModeCheckUser(models.Model):
    AddImageForModeCheckUserField = models.ImageField(upload_to ='image/list/',null=False,help_text='Maximum file size allowed is 5MB')
    # songs_name = model.f
    # def __str__(self):
    #     return self.Company_Name
    # class Meta:
    #     ordering = ['songs_name']



class Analysis_in_chart(models.Model):
    happy = models.IntegerField(default=1,editable=True,blank=True,null=True)
    sad = models.IntegerField(default=1,editable=True,blank=True,null=True)
    neutral = models.IntegerField(default=1,editable=True,blank=True,null=True)
    fear = models.IntegerField(default=1,editable=True,blank=True,null=True)
    diguest = models.IntegerField(default=1,editable=True,blank=True,null=True)
    surprise = models.IntegerField(default=1,editable=True,blank=True,null=True)
    angry = models.IntegerField(default=1,editable=True,blank=True,null=True)

