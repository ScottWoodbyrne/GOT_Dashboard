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
BATTLE_COLLECTION = 'battles-clean'
FIELDS = {'Name': True, 'Allegiances': True, 'Nobility': True, 'Book_of_Death': True,'Gender': True, '_id': False}
BATTLE_FIELDS = {'name': True, 'attacker_king': True, 'defender_king': True, 'attacker_outcome': True,'battle_type': True,'attacker_1': True,'defender_1': True, '_id': False}


@app.route('/')
def index():
    return render_template("index.html")


@app.route("/GOT/CharacterDeaths")
def GOTChar():

    # get and return data from characterDeaths collection
    connection = MongoClient(MONGO_URI)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    characters = collection.find(projection=FIELDS, limit=1000)

    json_charDeaths = []
    for c in characters:
        json_charDeaths.append(c)
    json_charDeaths = json.dumps(json_charDeaths)
    connection.close()
    return json_charDeaths

@app.route("/GOT/Battles")

def GOTBat():
    # get and return data from battles-clean collection
    connection = MongoClient(MONGO_URI)
    battlesCollection = connection[DBS_NAME][BATTLE_COLLECTION]
    battles = battlesCollection.find(projection=BATTLE_FIELDS, limit=100)
    json_battles = []
    for b in battles:
        json_battles.append(b)
    json_battles = json.dumps(json_battles)

    connection.close()

    return json_battles


if __name__ == '__main__':
    app.run(debug=True)
