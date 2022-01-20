from flask import Flask, request, jsonify, abort
from sqlalchemy import exc
from flask_migrate import Migrate
import json
from flask_cors import CORS
from models import setup_db

app = Flask(__name__)
db = setup_db(app)
migrate = Migrate(app, db)
CORS(app)