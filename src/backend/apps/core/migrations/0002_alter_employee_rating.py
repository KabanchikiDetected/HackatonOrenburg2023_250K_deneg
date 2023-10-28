# Generated by Django 4.2.6 on 2023-10-28 23:03

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='rating',
            field=models.FloatField(default=5.0, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)], verbose_name='Рейтинг'),
        ),
    ]
