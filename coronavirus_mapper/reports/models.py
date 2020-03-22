from datetime import datetime

from django.contrib.gis.db.models import PointField
from django.db import models


class Report(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    first_symptomatic = models.DateField(default=datetime.now)
    location = PointField(null=True, blank=True)

    @property
    def lat_lng(self):

        return list(getattr(self.point, "coords", []))[::-1]
