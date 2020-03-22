from django.views.generic import ListView
from .models import Report


class ReportListView(ListView):
    model = Report
    template_name = "reports/map.html"
