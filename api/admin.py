from django.contrib import admin
from .models import SampleModel
from .models import UserModel
from .models import SessionModel

# Register your models here.
admin.site.register(SampleModel)
admin.site.register(UserModel)
admin.site.register(SessionModel)