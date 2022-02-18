
from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

import uuid
import re , os
from django.core.exceptions import ValidationError

class UserAccountManager(BaseUserManager):

    def create_user(self, email, first,last,  password=None):
        if not email:
            raise ValueError("User must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email, first=first,last=last)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first,last, password):
        user = self.create_user(email,first,last, password)

        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


def validate_image(image):
    check_exts = (".jpg", ".jpeg", ".png")
    file_extension= os.path.splitext(str(image))
    print(image.size)
    if image.size >= 5000000:
        raise ValidationError("File should less then 5MB")
    if file_extension[1] == check_exts[0] or file_extension[1] == check_exts[1] or file_extension[1] == check_exts[2]:
        pass
        # raise ValidationError("Delete this if good")
    else:
        raise ValidationError("Provide Valid Image file such as jpeg jpg png")
    if image:
        pass
    else:
        raise ValidationError("Image is not provided")
def validate_last_name(last_name):
    if len(last_name)<=1:
        raise ValidationError("character must be 3 to 10 long")
    if len(last_name)>=20:
        raise ValidationError("character must be 3 to 10 long")
def validate_first_name(first_name):
    if len(first_name)<=3:
        raise ValidationError("character must be 3 to 10 long")
    if len(first_name)>=20:
        raise ValidationError("character must be 3 to 10 long")

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=40,unique=True)
    first = models.CharField(max_length=10,validators=[validate_first_name])
    last = models.CharField(max_length=10,validators=[validate_last_name])
    profile_pic = models.ImageField(upload_to ='images/',null=True,default="/images/default.png",validators=[validate_image],help_text='Maximum file size allowed is 5MB')
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first','last']

    objects = UserAccountManager()

    def get_id(self):
        return self.id

    def __str__(self):
        return self.email


