# FROM python:3.8-slim-buster

# WORKDIR /musicmoodapp

# COPY requirements.txt requirements.txt
# RUN pip install opencv-python
# # RUN apt-get install ffmpeg libsm6 libxext6
# RUN pip install -r requirements.txt
# # RUN apt-get update && apt-get install -y python3-opencv
# # RUN apt-get install -y python3-opencv
# # RUN pip install opencv-python
# # RUN pip3 install django-upgrade


# COPY . .

# CMD ["python3","manage.py","runserver","0.0.0.0:8000"]

FROM python:3.10.2
ENV PYTHONUNBUFFERED 1
WORKDIR /moodmusicplayer
ADD . /moodmusicplayer
COPY ./requirements.txt /moodmusicplayer/requirements.txt
RUN pip install -r requirements.txt
RUN apt-get install ffmpeg libsm6 libxext6

COPY . /moodmusicplayer
