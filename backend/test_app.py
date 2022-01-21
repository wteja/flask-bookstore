from os import environ
import unittest
import json

from api import app
from models import setup_db, Book, Order

database_host = environ.get('DATABASE_HOST', 'localhost:5432')
database_name = environ.get('DATABASE_NAME_TEST', 'book_test')
database_path = "postgresql://{}/{}".format(database_host, database_name)

class TriviaTestCase(unittest.TestCase):
    """This class represents the trivia test case"""

    def setUp(self):
        self.app = app
        self.client = self.app.test_client
        self.db = setup_db(self.app, database_path)
        self.db.drop_all()
        self.db.create_all()

    def test_guest_get_all_books(self):
        book = Book(title="Test 1", isbn="A000001", image="https://www.sampleimage.com/image.png", description="test")
        self.db.session.add(book)
        self.db.session.commit()

        res = self.client().get('/books')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['data'] != None)
        self.assertTrue(len(data['data']) == 1)
        self.assertEqual(data['data'][0]['title'], book.title)
        self.assertEqual(data['data'][0]['isbn'], book.isbn)
        self.assertEqual(data['data'][0]['image'], book.image)
        self.assertEqual(data['data'][0]['description'], book.description)

    def test_guest_get_book_by_id(self):
        book = Book(title="Test 1", isbn="A000001", image="https://www.sampleimage.com/image.png", description="test")
        self.db.session.add(book)
        self.db.session.commit()

        res = self.client().get('/books/' + str(book.id))
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['data'] != None)
        self.assertEqual(data['data']['title'], book.title)
        self.assertEqual(data['data']['isbn'], book.isbn)
        self.assertEqual(data['data']['image'], book.image)
        self.assertEqual(data['data']['description'], book.description)

    def test_guest_create_book_get_401(self):
        body = {
            "title": "Title A",
            "isbn": "A00000001",
            "image": "https://www.example.com/image.png",
            "description": "Test Description"
        }

        res = self.client().post('/books', json=body)
        self.assertEqual(res.status_code, 401)

    def test_guest_update_book_get_401(self):
        book = Book(title="Test 1", isbn="A000001", image="https://www.sampleimage.com/image.png", description="test")
        self.db.session.add(book)
        self.db.session.commit()

        res = self.client().patch('/books/' + str(book.id), json=book.as_dict())
        self.assertEqual(res.status_code, 401)

    def test_guest_delete_book_get_401(self):
        book = Book(title="Test 1", isbn="A000001", image="https://www.sampleimage.com/image.png", description="test")
        self.db.session.add(book)
        self.db.session.commit()

        res = self.client().delete('/books/' + str(book.id), json=book.as_dict())
        self.assertEqual(res.status_code, 401)


# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()
