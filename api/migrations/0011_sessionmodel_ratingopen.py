# Generated by Django 4.1.2 on 2022-12-13 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_ratingmodel_creator_ratingmodel_sessionid'),
    ]

    operations = [
        migrations.AddField(
            model_name='sessionmodel',
            name='ratingOpen',
            field=models.IntegerField(default=0, null=True),
        ),
    ]
