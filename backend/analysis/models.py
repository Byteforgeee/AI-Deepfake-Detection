from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Analysis(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    )
    FILE_TYPES = (
        ('image', 'Image'),
        ('video', 'Video'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='analyses')
    file = models.FileField(upload_to='uploads/%Y/%m/%d/')
    file_type = models.CharField(max_length=10, choices=FILE_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    result = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - {self.file.name} - {self.status}"