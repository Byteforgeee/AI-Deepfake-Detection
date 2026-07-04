from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.exceptions import ValidationError
from .models import Analysis
from .serializers import AnalysisSerializer
import os

ALLOWED_EXTENSIONS = {
    'image': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
    'video': ['.mp4', '.mov', '.avi', '.mkv', '.webm'],
}
MAX_FILE_SIZE = 100 * 1024 * 1024  # 100 MB

class UploadView(generics.CreateAPIView):
    serializer_class = AnalysisSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        if 'file' not in request.FILES:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        file_obj = request.FILES['file']

        if file_obj.size > MAX_FILE_SIZE:
            return Response(
                {'error': f'File size exceeds {MAX_FILE_SIZE // (1024*1024)} MB limit.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        ext = os.path.splitext(file_obj.name)[1].lower()
        if ext not in ALLOWED_EXTENSIONS['image'] and ext not in ALLOWED_EXTENSIONS['video']:
            return Response(
                {'error': 'Unsupported file format. Please upload an image or video.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        file_type = 'image' if ext in ALLOWED_EXTENSIONS['image'] else 'video'

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer, file_type=file_type)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer, file_type):
        serializer.save(user=self.request.user, file_type=file_type, status='pending')

class StatusView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, analysis_id):
        try:
            analysis = Analysis.objects.get(id=analysis_id, user=request.user)
            serializer = AnalysisSerializer(analysis)
            return Response(serializer.data)
        except Analysis.DoesNotExist:
            return Response({'error': 'Analysis not found'}, status=status.HTTP_404_NOT_FOUND)

class HistoryView(generics.ListAPIView):
    serializer_class = AnalysisSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Analysis.objects.filter(user=self.request.user).order_by('-created_at')

class SimulateProcessingView(APIView):
    """Simulate processing for demo purposes"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, analysis_id):
        try:
            analysis = Analysis.objects.get(id=analysis_id, user=request.user)
            # Simulate processing
            analysis.status = 'completed'
            analysis.result = {
                'verdict': 'REAL',
                'confidence': 96,
                'visual_score': 94,
                'audio_score': 98,
            }
            analysis.save()
            serializer = AnalysisSerializer(analysis)
            return Response(serializer.data)
        except Analysis.DoesNotExist:
            return Response({'error': 'Analysis not found'}, status=status.HTTP_404_NOT_FOUND)