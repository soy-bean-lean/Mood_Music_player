# Generated by Django 4.0.1 on 2022-02-19 16:20

import AddSongs.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SongsName',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('song_name', models.CharField(max_length=20, unique=True)),
                ('song_irsc', models.CharField(max_length=30, unique=True, validators=[AddSongs.models.IRSC_VALIDATE])),
                ('artist_name', models.CharField(max_length=20)),
                ('song_file', models.FileField(help_text='Maximum file size allowed is 20MB', upload_to='file/', validators=[AddSongs.models.AUDIO_VALIDATE])),
                ('cover_photo', models.FileField(help_text='Maximum file size allowed is 5MB', upload_to='cover/', validators=[AddSongs.models.validate_image])),
                ('category', models.CharField(choices=[('angry', 'Angry'), ('happy', 'Happy'), ('fear', 'Fear'), ('disgust', 'Disgust'), ('neutral', 'Neutral'), ('sad', 'Sad'), ('surprise', 'Surprise')], max_length=50)),
            ],
        ),
    ]
