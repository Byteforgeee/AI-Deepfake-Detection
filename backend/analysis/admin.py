from django.contrib import admin
from .models import Analysis

@admin.register(Analysis)
class AnalysisAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'file', 'file_type', 'status', 'created_at')
    search_fields = ('user__email', 'file')
    list_filter = ('status', 'file_type')