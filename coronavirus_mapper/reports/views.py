from django.views.generic import TemplateView


class ReportTemplateView(TemplateView):
    template_name = "reports/map.html"
