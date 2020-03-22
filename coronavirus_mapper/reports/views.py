from django.views.generic import TemplateView

from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework_gis.filters import InBBoxFilter

from .models import Report
from .serializers import ReportSerializer


class ReportTemplateView(TemplateView):
    template_name = "reports/map.html"


class ReportViewSet(ReadOnlyModelViewSet):
    queryset = Report.objects.all()
    bbox_filter_field = "location"
    filter_backends = (InBBoxFilter, )
    serializer_class = ReportSerializer
