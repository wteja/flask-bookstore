# Flask Book Store

The Book Store Owner (John) want to his online store, but didn't have payment system yet.

But John want to let his customer to be able login and **Pre-Order** book by adding their favorite books to shopping cart.

Then finish the order.

Finally, John will login and check all of orders in the same website.

## Hosted Information

Website already hosted. You can check:

https://flask-book-store.netlify.app

That is where front-end was hosted online.

For backend api, You can check:

https://flask-book-store.heroku.app

## Local Development

You can follow the instruction below to setup your own local setup.

### Front End

Go to `frontend` directory, install dependencies and start the project. It created using [Next.js](https://nextjs.org/)

First you will need to create `.env` file, you can check `.env-example` file for sample configuration.

#### .env File
```
NEXT_PUBLIC_AUTH0_DOMAIN=dev-x2a0z7ur.us.auth0.com
NEXT_PUBLIC_AUTH0_AUDIENCE=book-store
NEXT_PUBLIC_AUTH0_CLIENT_ID=j275lw7SrTrLqMkGNIglBe30K8thioBv
NEXT_PUBLIC_AUTH0_REDIRECT_URI=http://localhost:3000
NEXT_PUBLIC_BACKEND_URI=http://127.0.0.1:5000
```

As you seen in the commands above, top 4 lines is about how to setup authentication from [Auth0](https://auth0.com/), you might make use of example config or set your custom one.

After create `.env` file, you can start development server by using the following commands:

```bash
cd frontend
yarn # or npm install
yarn dev # or npm run dev
```

### Backend

Backend was created using [Flask](https://flask.palletsprojects.com/en/2.0.x/), [SQLAlchemy](https://www.sqlalchemy.org/), and [PostgreSQL](https://www.postgresql.org/)

#### How to setup backend

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

### Setup Authentication

Basically authentication already configured.
But you can set your own setting by export `AUTH0_DOMAIN` and `API_AUDIENCE`

```bash
export AUTH0_DOMAIN=your-id.auth0.com
export API_AUDIENCE=your-audience
```

### Running Unit Test

After setup local development like instructor above, you can run this command

```bash
python test_app.py
```

## Sample Usage

There are two sample users with difference roles

### Customer

Customer can only:
- See the books
- Add books to cart
- Remove book from cart
- Finish order

```
username: book-customer@yopmail.com
password: Book@12345
```

### Store Owner

Store Owner can:
- See the books
- Add books to cart
- Remove book from cart
- Finish order
- Add / Edit / Delete Books
- See & Delete order from customers.

```
username: book-owner@yopmail.com
password: Book@12345
```

## Author

[Weerayut Teja](https://github.com/wteja)