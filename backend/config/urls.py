from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from logements.views import HealthCheckView, LogementListView, LogementDetailView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', HealthCheckView.as_view(), name='health-check'),
    path('api/logements/', LogementListView.as_view(), name='logement-list'),
    path('api/logements/<slug:slug>/', LogementDetailView.as_view(), name='logement-detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
