# Generated by Django 4.0.1 on 2022-02-27 17:13

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_alter_useraccount_date_of_subcription'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='date_of_subcription',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2022, 2, 27, 22, 58, 31, 652683)),
        ),
    ]