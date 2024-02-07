import pymongo
from dotenv import load_dotenv
import os

def config():
    load_dotenv()
    mongo_url = os.getenv('MONGODB_URI')

    myclient = pymongo.MongoClient(mongo_url)
    return myclient