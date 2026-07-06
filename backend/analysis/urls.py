from django.urls import path
from .views import UploadMediaView, AnalyzeMediaView, MediaListView, ResultDetailView

urlpatterns = [
    path('upload/', UploadMediaView.as_view(), name='media-upload'),
    path('analyze/<uuid:media_id>/', AnalyzeMediaView.as_view(), name='media-analyze'),
    path('media/', MediaListView.as_view(), name='media-list'),
    path('result/<uuid:media_id>/', ResultDetailView.as_view(), name='media-result'),
]