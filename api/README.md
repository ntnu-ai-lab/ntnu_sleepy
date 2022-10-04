# Somnus API

## Development

### Database

To start a Postgres database locally for Django to use, ensure you have Docker intalled and then run

```bash
docker run -d -e POSTGRES_DB=django -e POSTGRES_PASSWORD=supersecret -e POSTGRES_USER=django --name=django-db --restart=always -p 5431:5432 postgres:alpine
```

If you want to change any of these parameters, make sure you also set them in the `.env` file (as `DB_USER` etc).

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

You can seed the data with#### Seeding data

To make it easier to get up and running, some seed data is provided.

You can seed the data with

```python
./manage.py seed --mode=[MODE]
```

Args:

- Mode: 'clear' | 'refresh'. Default: 'refresh'. Clear will delete all the data, refresh will delete and seed new data.
