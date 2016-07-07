from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json


app = Flask(__name__)

MONGODB_HOST = 'ds017205.mlab.com'
MONGODB_PORT = 17205
DBS_NAME = 'heroku_lmm9rvpt'
MONGO_URI = 'mongodb://root:database@ds017205.mlab.com:17205/heroku_lmm9rvpt'
COLLECTION_NAME = 'characterDeaths'
FIELDS = {'Name': True, 'Allegiances': True, 'Nobility': True, 'Book_of_Death': True,'Gender': True, '_id': False}


@app.route('/')
def index():
    return render_template("index.html")


@app.route("/GOT/CharacterDeaths")
def GOTChar():
    connection = MongoClient(MONGO_URI)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    characters = collection.find(projection=FIELDS, limit=1000)
    json_charDeaths = []
    for c in characters:
        json_charDeaths.append(c)
    json_charDeaths = json.dumps(json_charDeaths)
    connection.close()
    return json_charDeaths


if __name__ == '__main__':
    app.run(debug=True)
