# Backend

Backend was created using [Flask](https://flask.palletsprojects.com/en/2.0.x/), [SQLAlchemy](https://www.sqlalchemy.org/), and [PostgreSQL](https://www.postgresql.org/)

### How to setup backend

1. Install Python dependencies

```bash
pip install -r requirements.txt
# or
pip3 install -r requirements.txt
```

2. Create database `book` and `book_test` in your `PostgreSQL` server

3. Navigate to `backend` directory

```bash
cd backend
```

4. Export `FLASK_APP` and `FLASK_DEBUG` (optional)

```bash
export FLASK_APP=api.py
export FLASK_DEBUG=true
```

5. Export `DATABASE_HOST` and `DATABASE_NAME` and `DATABASE_NAME_TEST`

```bash
export DATABASE_HOST=localhost:5432
export DATABASE_NAME=book
export DATABASE_NAME_TEST=book_test
```

5. Run migration script

```bash
flask db upgrade
```

6. Finally, run `flask app`

```bash
flask run --reload
```

## Setup Authentication

Basically authentication already configured.
But you can set your own setting by export `AUTH0_DOMAIN` and `API_AUDIENCE`

```bash
export AUTH0_DOMAIN=your-id.auth0.com
export API_AUDIENCE=your-audience
```

## Running Unit Test

After setup local development like instructor above, you can run this command

```bash
python test_app.py
```