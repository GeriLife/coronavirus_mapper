from django.contrib import admin
from django.urls import path

from reports.views import ReportListView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', ReportListView.as_view())
]
