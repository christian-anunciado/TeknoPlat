from django.contrib import admin
from .models import SampleModel, SessionModel

# Register your models here.
admin.site.register(SampleModel)
admin.site.register(SessionModel)
