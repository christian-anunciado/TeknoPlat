from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import SampleModel
from .models import UserModel
from .models import SessionModel
from .models import RatingModel
from .models import AverageRatingModel
from .models import ReportModel

# Customize your Admin Model here.


class SessionAdminConfig(admin.ModelAdmin):
    list_display = ('sessionName', 'sessionDescription',
                    'searchID', 'startsAt', 'status')
    search_fields = ('sessionName', 'searchID')
    ordering = ['id']
    # fields = ('creator', 'sessionID', 'sessionName', 'sessionDescription',
    #           'sessionPassword', 'searchID', 'status', 'startsAt')
    fields = ()

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


from django.contrib.auth.admin import UserAdmin


# Register your models here.
class UserAdminConfig(UserAdmin):
    model = UserModel
    search_fields = ('email', 'first_name',)
    list_filter = ('email', 'first_name', 'is_active', 'is_staff')
    #ordering = ('id')
    list_display = ('id','email', 'first_name', 'last_name','institute')
    fieldsets = (
        (None, {'fields': ('email', 'first_name', 'last_name','institute')}),
    )

admin.site.register(SampleModel)
admin.site.register(SessionModel, SessionAdminConfig)
admin.site.register(RatingModel)
admin.site.register(UserModel,UserAdminConfig)
admin.site.register(AverageRatingModel)
admin.site.register(ReportModel)
