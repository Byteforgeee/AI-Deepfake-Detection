from rest_framework import serializers
from .models import MediaFile, AnalysisResult

class MediaFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaFile
        fields = ['id', 'file', 'file_type', 'status', 'duration_seconds', 'created_at']
        read_only_fields = ['status', 'created_at']

class AnalysisResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalysisResult
        fields = ['id', 'verdict', 'confidence_score', 'raw_output', 'completed_at']