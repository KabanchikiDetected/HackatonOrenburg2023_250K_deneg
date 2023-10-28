from django.db import models


class TestLog(models.Model):
    test_id = models.CharField(
        "Тест", max_length=100 
    )
    
    user = models.ForeignKey(
        "core.Employee", on_delete=models.CASCADE,
        verbose_name="Пользователь"
    )
    
    correct = models.PositiveIntegerField(
        "Правильных ответов"
    )
    
    total = models.PositiveIntegerField(
        "Всего вопросов"
    )
    
    done = models.DateTimeField(
        "Сделано в:"
    )
    
    class Meta:
        verbose_name = "История теста"
        verbose_name_plural = "История тестов"
    
    def __str__(self) -> str:
        return f"Test: {self.test_id} from: {self.user}"
