from rest_framework import serializers
from .models import Analysis

class AnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Analysis
        fields = ['id', 'file', 'file_type', 'status', 'result', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'file_type', 'status', 'result', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)