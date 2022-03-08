from django.db import models

class PaymentsDetails(models.Model):
    money_for_subscription = models.CharField(max_length=20,unique=True,editable=True)
    Time_for_subcriptions = models.CharField(max_length=20,unique=True,editable=True)
    def __str__(self):
        return self.money_for_subscription
    class Meta:
        ordering = ['id']