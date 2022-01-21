from os import environ
import unittest
import json
from flask_sqlalchemy import SQLAlchemy

from api import app
from models import setup_db, Book, Order


class TriviaTestCase(unittest.TestCase):
    """This class represents the trivia test case"""

    def setUp(self):
        self.app = app
        self.client = self.app.test_client
        self.database_host = environ.get('DATABASE_HOST', 'localhost:5432')
        self.database_name = environ.get('DATABASE_NAME', 'book_test')
        self.database_path = "postgresql://{}/{}".format(
            self.database_host, self.database_name)
        setup_db(self.app, self.database_path)

    def test_get_questions_with_paginated(self):
        res = self.client().get('/questions')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['total_questions'] != None)
        self.assertTrue(data['questions'] != None)
        self.assertTrue(data['categories'] != None)

    def test_404_non_exists_pagination(self):
        res = self.client().get('/questions?page=999')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'Resource not found')


# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()
