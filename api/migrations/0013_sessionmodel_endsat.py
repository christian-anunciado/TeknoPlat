# Generated by Django 4.1.2 on 2022-12-20 12:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_sessionmodel_ratingopen_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='sessionmodel',
            name='endsAt',
            field=models.DateTimeField(null=True),
        ),
    ]