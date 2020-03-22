from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin
from .models import Report


@admin.register(Report)
class ReportAdmin(OSMGeoAdmin):
    default_lon = 0
    default_lat = 0
    default_zoom = 1
