from track_fav import update_price
from helper import scrap_amazon, scrap_flipkart
from flask import Flask, request,jsonify
from flask_cors import CORS
from flask_apscheduler import APScheduler



app = Flask(__name__)
scheduler = APScheduler()
CORS(app)


@app.route('/api/hello')
def main():
    return {"message": 'Hello World'}


@app.route('/api/input/compare', methods=['POST'])
def compare():
    name = request.json.get('inputData', "")
    site = request.args.get('site', '')
    if site == 'amazon':
        data = scrap_amazon(name)
    elif site == 'flipkart':
        data = scrap_flipkart(name)
    else:
        return jsonify({"error": "Invalid site specified"})

    return data

@app.route('/api/cron')
def cron():
    scheduler.add_job(id='update_price', func=update_price, trigger='cron', hour=10)
    
if __name__ == "__main__":
    app.run(debug=True)
    scheduler.start()
    scheduler.init_app(app)
