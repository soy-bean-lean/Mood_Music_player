# Generated by Django 4.0.1 on 2022-02-28 18:16

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0011_alter_useraccount_date_of_subcription'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='date_of_subcription',
            field=models.DateField(blank=True, default=datetime.datetime(2022, 3, 1, 0, 0, 58, 140217)),
        ),
    ]