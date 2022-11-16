from django.contrib import admin
from .models import SampleModel
from .models import UserModel
from .models import SessionModel
from .models import RatingModel

# Register your models here.
admin.site.register(SampleModel)
admin.site.register(UserModel)
admin.site.register(SessionModel)
admin.site.register(RatingModel)