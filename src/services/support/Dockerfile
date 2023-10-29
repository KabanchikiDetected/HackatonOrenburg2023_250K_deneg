FROM python:3.10

WORKDIR /review

EXPOSE 8082

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD uvicorn main:app --host 0.0.0.0 --port 8082
