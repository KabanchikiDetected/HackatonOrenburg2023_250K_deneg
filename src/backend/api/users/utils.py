import string
import random
import secrets

from django.core.mail import send_mail
from typing import List


def generate_code() -> str:
    return ''.join(random.sample(string.ascii_lowercase, 5))


def generate_password() -> str:
    password = secrets.token_urlsafe(6)
    return password
    

def send_email(subject: str, message: str, to: List[str]):
    send_mail(subject, message, "monikkere@gmail.com", to)
