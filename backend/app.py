from flask import Flask, request, jsonify, abort
from sqlalchemy import exc
from flask_migrate import Migrate
import json
from flask_cors import CORS
from models import setup_db, Book, Order
from auth import AuthError, requires_auth

app = Flask(__name__)
db = setup_db(app)
migrate = Migrate(app, db)
CORS(app)


@app.route('/books', methods=['GET'])
def get_books():
    books = Book.query.order_by(Book.id).all()

    return jsonify({
        "success": True,
        "data": [book.as_dict() for book in books]
    })

@app.route('/selected-books', methods=['GET'])
def get_selected_books():
    ids = request.args['ids'].split(',')
    books = []
    if len(ids) > 0 and ids[0] != '':
        books = Book.query.filter(Book.id.in_(ids)).order_by(Book.id).all()

    return jsonify({
        "success": True,
        "data": [book.as_dict() for book in books]
    })


@app.route('/books/<int:id>', methods=['GET'])
def get_book_detail(id):
    book = Book.query.get(id)

    if not book:
        abort(404)

    return jsonify({
        "success": True,
        "data": book.as_dict()
    })


@app.route('/books', methods=['POST'])
@requires_auth('post:books')
def create_book(payload):
    body = request.json
    book = Book()
    book.title = body['title']
    book.isbn = body['isbn']
    book.image = body['image']
    book.description = body['description']

    try:
        db.session.add(book)
        db.session.commit()

        return jsonify({
            "success": True,
            "data": book.as_dict()
        })
    except Exception as error:
        print(error)
        db.session.rollback()
        abort(500)
    finally:
        db.session.close()


@app.route('/books/<int:id>', methods=['PATCH'])
@requires_auth('patch:books')
def update_book(payload, id):
    book = Book.query.get(id)

    if not book:
        abort(404)

    body = request.json

    book.title = body['title']
    book.isbn = body['isbn']
    book.image = body['image']
    book.description = body['description']

    try:
        db.session.commit()
        return jsonify({
            "success": True,
            "data": book.as_dict()
        })
    except Exception as error:
        print(error)
        db.session.rollback()
        abort(500)
    finally:
        db.session.close()


@app.route('/books/<int:id>', methods=['DELETE'])
@requires_auth('delete:books')
def delete_book(payload, id):
    book = Book.query.get(id)

    if not book:
        abort(404)

    try:
        db.session.delete(book)
        db.session.commit()
        return jsonify({
            "success": True
        })
    except Exception as error:
        print(error)
        db.session.rollback()
        abort(500)
    finally:
        db.session.close()


@app.route('/orders', methods=['GET'])
@requires_auth('get:orders')
def get_orders(payload):
    orders = Order.query.all()

    return jsonify({
        "success": True,
        "data": [order.as_dict() for order in orders]
    })


@app.route('/my_orders', methods=['GET'])
@requires_auth('get:orders')
def get_my_orders(payload):
    orders = Order.query.filter_by(Order.user_id == payload['sub']).all()

    return jsonify({
        "success": True,
        "data": [order.as_dict() for order in orders]
    })


@app.route('/orders/<int:id>', methods=['GET'])
@requires_auth('get:orders')
def get_order_detail(payload, id):
    order = Order.query.get(id)

    if not order:
        abort(404)

    return jsonify({
        "success": True,
        "data": order.as_dict()
    })


@app.route('/orders', methods=['POST'])
@requires_auth('post:orders')
def create_order(payload):
    body = request.json
    order = Order()
    order.user_id = payload['sub']

    for b in body['books']:
        book = Book.query.get(b['id'])
        if book:
            order.books.append(book)

    try:
        db.session.add(order)
        db.session.commit()

        return jsonify({
            "success": True,
            "data": order.as_dict()
        })
    except Exception as error:
        print(error)
        db.session.rollback()
        abort(500)
    finally:
        db.session.close()


@app.route('/order/<int:id>', methods=['DELETE'])
@requires_auth('delete:orders')
def delete_order(payload, id):
    order = Order.query.get(id)

    if not order:
        abort(404)

    try:
        db.session.delete(order)
        db.session.commit()
        return jsonify({
            "success": True
        })
    except Exception as error:
        print(error)
        db.session.rollback()
        abort(500)
    finally:
        db.session.close()


'''
Error Handlers
'''


@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "success": False,
        "error": 404,
        "message": "resource not found"
    }), 404


@app.errorhandler(AuthError)
def auth_error(error):
    return jsonify({
        "success": False,
        "error": error.status_code,
        "message": error.error['description']
    }), error.status_code


@app.errorhandler(400)
def bad_request(error):
    return jsonify({
        "success": False,
        "error": 400,
        "message": 'Bad Request'
    }), 400


@app.errorhandler(401)
def unauthorized(error):
    return jsonify({
        "success": False,
        "error": 401,
        "message": 'Unathorized'
    }), 401


@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({
        "success": False,
        "error": 405,
        "message": 'Method Not Allowed'
    }), 405


@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({
        "success": False,
        "error": 500,
        "message": 'Internal Server Error'
    }), 500
