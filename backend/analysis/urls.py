from django.urls import path
from .views import UploadView, StatusView, HistoryView, SimulateProcessingView

urlpatterns = [
    path('upload/', UploadView.as_view(), name='upload'),
    path('status/<int:analysis_id>/', StatusView.as_view(), name='status'),
    path('history/', HistoryView.as_view(), name='history'),
    path('simulate/<int:analysis_id>/', SimulateProcessingView.as_view(), name='simulate'),
]