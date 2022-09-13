# Somnus API

## Development

### Database

To start a Postgres database locally for Django to use, ensure you have Docker intalled and then run
```bash
docker run -d -e POSTGRES_DB=django -e POSTGRES_PASSWORD=supersecret -e POSTGRES_USER=django --name=django-db --restart=always -p 5431:5432 postgres:alpine
```

Then create a file in this folder called `.default_pgpass` with the content
```
localhost:5431:somnus:django:supersecret
```

### Python/Django

You need a recent version of Python (preferably 3.10.x). Then set up a virtual env and such:

```bash
python -m venv venv
source venv/bin/activate # On *nix systems
./venv/Scripts/activate # On Windows
pip install -r requirements.txt
```

Once you've done both of these you can start the Django server locally with:
```bash
./manage.py runserver
```