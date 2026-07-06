from django.db import models
from core.models import BaseModel
from analysis.models import AnalysisResult

class Report(BaseModel):
    analysis_result = models.OneToOneField(AnalysisResult, on_delete=models.CASCADE, related_name='report')
    generated_pdf = models.FileField(upload_to='reports/', null=True, blank=True)

    def __str__(self):
        return f"Report for {self.analysis_result_id}"