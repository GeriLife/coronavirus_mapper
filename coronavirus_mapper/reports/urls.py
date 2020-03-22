from rest_framework.routers import DefaultRouter
from.views import ReportViewSet

router = DefaultRouter()

router.register(
    "reports_json",
    ReportViewSet,
    basename="report_json"
)

urlpatterns = router.urls

app_name = "reports"
