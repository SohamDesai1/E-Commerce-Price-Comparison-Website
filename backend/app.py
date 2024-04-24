from selenium_scrap import amazon_selenium_scrap,flipkart_selenium_scrap
from track_fav import update_price
from helper import scrap_amazon, scrap_flipkart
from flask import Flask, request,jsonify
from flask_cors import CORS
from flask_apscheduler import APScheduler



app = Flask(__name__)
scheduler = APScheduler()
CORS(app)


@app.route('/api/data')
def main():
    return {"message": 'Hello World'}


@app.route('/api/input/compare', methods=['POST'])
def compare():
    name = request.json.get('inputData', "")
    site = request.args.get('site', '')
    if site == 'amazon':
        data = amazon_selenium_scrap(name)
    elif site == 'flipkart':
        data = flipkart_selenium_scrap(name)
    else:
        return jsonify({"error": "Invalid site specified"})

    return data


@scheduler.task("interval",days=1)
def job():
    update_price()
    
    
if __name__ == "__main__":
    scheduler.init_app(app)
    scheduler.start()
    app.run(debug=True)
