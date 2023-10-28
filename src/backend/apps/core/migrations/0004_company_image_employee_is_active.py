# Generated by Django 4.2.6 on 2023-10-28 10:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_department_created'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='image',
            field=models.ImageField(default='default_logo.png', upload_to='media/logo', verbose_name='Логотип'),
        ),
        migrations.AddField(
            model_name='employee',
            name='is_active',
            field=models.BooleanField(default=True, verbose_name='Активен?'),
        ),
    ]