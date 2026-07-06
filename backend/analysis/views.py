from django.utils import timezone
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import MediaFile, AnalysisResult
from .serializers import MediaFileSerializer, AnalysisResultSerializer
from .inference import run_detection


class UploadMediaView(generics.CreateAPIView):
    serializer_class = MediaFileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AnalyzeMediaView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, media_id):
        try:
            media_file = MediaFile.objects.get(id=media_id, user=request.user)
        except MediaFile.DoesNotExist:
            return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)

        media_file.status = 'processing'
        media_file.save()

        # NOTE: running synchronously for now (fine for local dev).
        # Move this to a Celery task once uploads/model runtime grow.
        result_data = run_detection(media_file.file.path, media_file.file_type)

        result, _ = AnalysisResult.objects.update_or_create(
            media_file=media_file,
            defaults={
                **result_data,
                "completed_at": timezone.now(),
            }
        )
        media_file.status = 'done'
        media_file.save()

        return Response(AnalysisResultSerializer(result).data)


class MediaListView(generics.ListAPIView):
    serializer_class = MediaFileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return MediaFile.objects.filter(user=self.request.user).order_by('-created_at')


class ResultDetailView(generics.RetrieveAPIView):
    serializer_class = AnalysisResultSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'media_file_id'
    lookup_url_kwarg = 'media_id'

    def get_queryset(self):
        return AnalysisResult.objects.filter(media_file__user=self.request.user)