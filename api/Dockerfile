FROM python:3.10

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

RUN ./manage.py collectstatic

EXPOSE 8000

CMD ["gunicorn", "--bind", ":8000", "somnus.wsgi"]
