# Generated by Django 4.0.1 on 2022-02-26 17:41

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_alter_useraccount_date_of_subcription'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='date_of_subcription',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2022, 2, 26, 23, 26, 26, 935463)),
        ),
    ]