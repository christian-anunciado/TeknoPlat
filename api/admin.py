from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import SampleModel
from .models import UserModel
from .models import SessionModel
from .models import RatingModel

# Customize your Admin Model here.


class SessionAdminConfig(admin.ModelAdmin):
    list_display = ('id', 'sessionName', 'sessionDescription',
                    'searchID', 'startsAt', 'status')
    search_fields = ('sessionName', 'searchID')
    ordering = ['id']
    fields = ()

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


# Register your models here.
admin.site.register(SampleModel)
admin.site.register(UserModel)
admin.site.register(SessionModel, SessionAdminConfig)
admin.site.register(RatingModel)
