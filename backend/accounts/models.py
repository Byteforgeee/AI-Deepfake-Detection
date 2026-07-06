from django.db import models
from django.contrib.auth.models import User
from core.models import BaseModel

class Profile(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    organization = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.user.username