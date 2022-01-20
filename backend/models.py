from os import environ
from sqlalchemy import Column, String, Integer, ForeignKey
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

database_host = environ.get('DATABASE_HOST', 'localhost:5432')
database_name = environ.get('DATABASE_NAME', 'book')
database_uri = "postgresql://{}/{}".format(database_host, database_name)

db = SQLAlchemy()
migrate = None

def setup_db(app):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_uri
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    return db

orderBook = db.Table('order_books', 
    Column('order_id', Integer, ForeignKey('order.id'), primary_key=True),
    Column('book_id', Integer, ForeignKey('book.id'), primary_key=True)
)

class Book(db.Model):
    __tablename__ = 'book'
    id = Column(db.Integer, primary_key=True)
    title = Column(String, nullable=False)
    isbn = Column(String, nullable=False)
    image = Column(String)
    description = Column(String)

class Order(db.Model):
    __tablename__ = 'order'
    id = Column(db.Integer, primary_key=True)
    user_id = Column(String, nullable=False)
    books = db.relationship('book', secondary=orderBook, backref="order")