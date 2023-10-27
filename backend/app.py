from helper import scrap_amazon, getAmznImage
from flask import Flask, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/api/data')
def main():
    return {"message": 'Hello World'}


@app.route('/api/input', methods=['POST'])
def track():
    url = request.json.get('inputData', "")
    for i in range(1):
        if "amazon" or "amzn" in url:
            product_price = scrap_amazon(url)
            # product_img = getAmznImage(url)
            return  product_price

        # elif "flipkart" in url:
        #     product_price = scrapeProductInfo_flkt(url)
        #     if product_price != -1:
        #         break


if __name__ == "__main__":
    app.run(debug=True)
