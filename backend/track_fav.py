from listener import price_amazon,price_flipkart
from db import config
import time

myclient = config()
mydb = myclient["Major_Project"]
mycol = mydb["products"]

def update_price():
    for doc in mycol.find({}, {"name": 1, "a_price": 1, "f_price": 1 ,"_id": 0}):
        name = doc["name"]
        a_price = doc.get("a_price", None)  
        f_price = doc.get("f_price", None) 
        if a_price is not None:
            a_price = int(a_price)
        if f_price is not None:
            f_price = int(f_price)

        new_a_price = price_amazon(name)
        new_f_price = price_flipkart(name)
        if new_a_price is not None:
            new_a_price = int(new_a_price)
        if new_f_price is not None:
            new_f_price = int(new_f_price)

        if new_a_price != a_price:
            mycol.update_one({"name": name}, {"$set": {"a_price": new_a_price}},upsert=True)
            mycol.update_one({"name": name}, {"$set": {"a_time": time.time()}},upsert=True)
            mycol.update_one({"name": name},{"$push":{'a_price_change': new_a_price}},upsert=True)
            
        if new_f_price != f_price:
            mycol.update_one({"name": name}, {"$set": {"f_price": new_f_price}},upsert=True)
            mycol.update_one({"name": name}, {"$set": {"f_time": time.time()}},upsert=True)
            mycol.update_one({"name": name},{"$push":{'f_price_change': new_f_price}},upsert=True)