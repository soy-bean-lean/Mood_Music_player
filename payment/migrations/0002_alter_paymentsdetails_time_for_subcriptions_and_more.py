# Generated by Django 4.0.1 on 2022-03-08 10:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paymentsdetails',
            name='Time_for_subcriptions',
            field=models.CharField(max_length=20, unique=True),
        ),
        migrations.AlterField(
            model_name='paymentsdetails',
            name='money_for_subscription',
            field=models.CharField(max_length=20, unique=True),
        ),
    ]