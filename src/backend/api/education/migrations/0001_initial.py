# Generated by Django 4.2.6 on 2023-10-28 13:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='TestLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('test_id', models.CharField(max_length=100, verbose_name='Тест')),
                ('correct', models.PositiveIntegerField(max_length=8, verbose_name='Правильных ответов')),
                ('total', models.PositiveIntegerField(max_length=8, verbose_name='Всего вопросов')),
                ('done', models.DateTimeField(verbose_name='Сделано:')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'История теста',
                'verbose_name_plural': 'История тестов',
            },
        ),
    ]
