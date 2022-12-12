# Generated by Django 4.1.2 on 2022-12-12 08:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_remove_ratingmodel_creator_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='ratingmodel',
            name='creator',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='ratingmodel',
            name='sessionID',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.sessionmodel'),
        ),
    ]
