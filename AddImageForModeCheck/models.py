from django.db import models
# from django.core.exceptions import ValidationError

class AddImageForModeCheckUser(models.Model):
    AddImageForModeCheckUserField = models.ImageField(upload_to ='image/list/',null=False,help_text='Maximum file size allowed is 5MB')
    # songs_name = model.f
    # def __str__(self):
    #     return self.Company_Name
    # class Meta:
    #     ordering = ['songs_name']