FROM python:3.10

WORKDIR /educate

EXPOSE 8080

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD uvicorn main:app --host 0.0.0.0 --port 8080
