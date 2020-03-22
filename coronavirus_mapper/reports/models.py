from django.contrib.gis.db.models import PointField
from django.db import models


class Report(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
