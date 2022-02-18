from django.db import models
import re
from django.core.exceptions import ValidationError
import os , uuid

class EMOTIONS_CHOICES(models.TextChoices):
    angry = 'angry'
    happy = 'happy'
    fear = 'fear'
    disgust='disgust'
    neutral='neutral'
    sad='sad'
    surprise='surprise'
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
def IRSC_VALIDATE(IRSC_CODE):
    if re.search(r'[^a-zA-Z0-9()$%-]', IRSC_CODE):
        raise ValidationError('IRSC code not Valid')
def AUDIO_VALIDATE(AUDIO_FILE):
    if AUDIO_FILE.size > 40000000:
        raise ValidationError("Audio file too large ( > 40mb )")
    if not AUDIO_FILE.content_type in ["audio/mpeg","audio/wav","audio/wave", "audio/wav", "audio/x-wav", "audio/x-pn-wav", "audio/mpeg3", "audio/mpeg", "audio/mp3", "audio/x-mpeg-3","audio/basic","audio/basic","auido/L24","audio/mpeg","audio/mp4","audio/vnd.wav"]:
        raise ValidationError("Upload Valid Music")
    if not os.path.splitext(AUDIO_FILE.name)[1] in [".mp3",".wav",".mp4",".MP3",".MP4"]:
        raise ValidationError("Upload Valid Music")
    pass
class SongsName(models.Model):
    # International Standard Recording Code (ISRC)
    uuid = models.UUIDField(primary_key=True,default=uuid.uuid4, db_index=True, editable=False, unique=True)
    song_name = models.CharField(max_length=20,unique=True,editable=True)
    song_irsc = models.CharField(max_length=30,unique=True,validators=[IRSC_VALIDATE])
    artist_name = models.CharField(max_length=20,null=False)
    song_file = models.FileField(upload_to ='file/',null=False,help_text='Maximum file size allowed is 20MB',validators=[AUDIO_VALIDATE])
    cover_photo = models.FileField(upload_to ='cover/',validators=[validate_image],null=False,help_text='Maximum file size allowed is 5MB')
    category = models.CharField(max_length=50, choices=EMOTIONS_CHOICES.choices)
    def __str__(self):
        return self.uuid
    # class Meta:
    #     ordering = ['songs_name']