from rest_framework_gis.serializers import (
    GeoFeatureModelSerializer
)

from .models import Report


class ReportSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Report
        geo_field = "location"
        fields = ("first_symptomatic", )
