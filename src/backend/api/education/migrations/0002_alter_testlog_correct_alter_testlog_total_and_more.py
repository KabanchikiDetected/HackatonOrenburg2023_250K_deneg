# Generated by Django 4.2.6 on 2023-10-28 13:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_company_image_employee_is_active'),
        ('education', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='testlog',
            name='correct',
            field=models.PositiveIntegerField(verbose_name='Правильных ответов'),
        ),
        migrations.AlterField(
            model_name='testlog',
            name='total',
            field=models.PositiveIntegerField(verbose_name='Всего вопросов'),
        ),
        migrations.AlterField(
            model_name='testlog',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.employee', verbose_name='Пользователь'),
        ),
    ]
