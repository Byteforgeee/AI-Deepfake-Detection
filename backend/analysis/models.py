from django.db import models
from django.contrib.auth.models import User
from core.models import BaseModel

class MediaFile(BaseModel):
    FILE_TYPES = (('video', 'Video'), ('audio', 'Audio'))
    STATUS_CHOICES = (
        ('uploaded', 'Uploaded'),
        ('processing', 'Processing'),
        ('done', 'Done'),
        ('failed', 'Failed'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='media_files')
    file = models.FileField(upload_to='uploads/%Y/%m/%d/')
    file_type = models.CharField(max_length=10, choices=FILE_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='uploaded')
    duration_seconds = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.file.name} ({self.status})"


class AnalysisResult(BaseModel):
    VERDICT_CHOICES = (('real', 'Real'), ('fake', 'Fake'))

    media_file = models.OneToOneField(MediaFile, on_delete=models.CASCADE, related_name='result')
    verdict = models.CharField(max_length=10, choices=VERDICT_CHOICES, null=True, blank=True)
    confidence_score = models.FloatField(null=True, blank=True)
    raw_output = models.JSONField(null=True, blank=True)  # per-frame/segment scores, heatmaps, etc.
    completed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Result for {self.media_file_id}: {self.verdict}"