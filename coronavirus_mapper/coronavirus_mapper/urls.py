from django.contrib import admin
from django.urls import include, path
from django.conf.urls import url

from reports.views import ReportTemplateView
import reports.urls as reports_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    url('^reports/', include('reports.urls', namespace='reports')),
    path('', ReportTemplateView.as_view())
]
