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
export DATABASE_HOST=postgres@localhost:5432
export DATABASE_NAME=book
export DATABASE_NAME_TEST=book_test
```

**NOTE** Notice that I put `postgres` as database username

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

## Environment Variables

In case that you want to export initial environment variables at once please check file `init` in project root before running
If you are ready, run it with

```bash
bash ./init
```

## API

### Get All Books

GET `/books` 
Get a list of books
#### Example Response
```json
{
    "data": [
        {
            "description": "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
            "id": 1,
            "image": "https://eloquentjavascript.net/img/cover.jpg",
            "isbn": "9781593279509",
            "title": "Eloquent JavaScript, Third Edition"
        },
        ...
    ],
    "success": true
}

```

### Get book by ID

GET `/books/{id}` 
Get a book by ID
#### Example Response
```json
{
    "data": {
            "description": "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
            "id": 1,
            "image": "https://eloquentjavascript.net/img/cover.jpg",
            "isbn": "9781593279509",
            "title": "Eloquent JavaScript, Third Edition"
        },
    "success": true
}

```

### Create Book

POST `/books` 
Permission `post:books`
Create a book
#### Example Request
```json
{

    "isbn": "9781593279509",
    "title": "Eloquent JavaScript, Third Edition",
    "description": "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
    "image": "https://eloquentjavascript.net/img/cover.jpg"
}

```

### Update Book

PATCH `/books/{id}` 
Permission `patch:books`
Update a book
#### Example Request
```json
{

    "isbn": "9781593279509",
    "title": "Eloquent JavaScript, Third Edition",
    "description": "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
    "image": "https://eloquentjavascript.net/img/cover.jpg"
}

```

### Delete Book

DELETE `/books/{id}` 
Permission `delete:books`
Delete a book
#### Example Response
```json
{
    "success": true
}

```

### Get All Orders

GET `/orders` 
Permission `get:orders`
Get a list of order that customers made.
#### Example Response
```json
{
    "data": [
        {
            "id": 1,
            "user_id": "auth0|0000000000000001"
        },
        {
            "id": 2,
            "user_id": "auth0|0000000000000002"
        }
    ],
    "success": true
}

```

POST `/orders` 
Permission `post:orders`
Create an order
#### Example Request
```json
{
    "books": [
        {
            "id": 1
        },

        {
            "id": 2
        }
    ]
}

```

DELETE `/orders/{id}` 
Permission `delete:orders`
Delete an order
#### Example Response
```json
{
    "success": true
}

```