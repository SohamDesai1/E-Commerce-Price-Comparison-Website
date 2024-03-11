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


@app.route('/api/compare', methods=['POST'])
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

if __name__ == "__main__":
    scheduler.init_app(app)
    scheduler.start()
    app.run(debug=True)
