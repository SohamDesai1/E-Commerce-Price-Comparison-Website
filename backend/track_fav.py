from bson import ObjectId
from listener import price_amazon,price_flipkart, sendMail
from db import config
from apscheduler.schedulers.blocking import BlockingScheduler

myclient = config()
mydb = myclient["Major_Project"]
mycol = mydb["products"]

def update_price():
    for doc in mycol.find({}, {"name": 1, "a_price": 1, "f_price": 1 ,"_id": 0}):
        name = doc["name"]
        user_id = doc.get("user", None)
        a_price = doc.get("a_price", None)  
        f_price = doc.get("f_price", None) 
        a_link = doc.get("a_link", None) 
        f_link = doc.get("f_link", None)
        
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
            mycol.update_one({"name": name}, {"$set": {"a_price": new_a_price}})
            mycol.update_one({"name": name},{"$push":{'a_price_change': new_a_price}})
            
        if new_f_price != f_price:
            mycol.update_one({"name": name}, {"$set": {"f_price": new_f_price}})
            mycol.update_one({"name": name},{"$push":{'f_price_change': new_f_price}})
        
        if new_a_price < a_price and (a_price != -1):
            if user_id:
                user = mydb.users.find_one({"_id": ObjectId(user_id), "email": {"$exists": True}})
                if user:
                    email = user["email"]
                    sendMail(email,name, new_a_price,a_link)
        if new_f_price < f_price and (f_price != -1):
            if user_id:
                user = mydb.users.find_one({"_id": ObjectId(user_id), "email": {"$exists": True}})
                if user:
                    email = user["email"]
                    sendMail(email,name, new_f_price,f_link)


scheduler = BlockingScheduler()
scheduler.add_job(update_price, 'cron', hour=10)
scheduler.start()