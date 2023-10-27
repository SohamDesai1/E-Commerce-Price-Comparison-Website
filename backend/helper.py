from flask import jsonify
import requests
import json
from bs4 import BeautifulSoup


def scrap_amazon(url):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"}
        resp = requests.get(url, headers=headers)
        soup = BeautifulSoup(resp.content, 'html.parser')
        title = soup.find("h1", attrs={"id": 'title'}).text.strip()
        price = soup.find(
            'span', attrs={'class': 'a-price-whole'}).get_text().replace(",", "")
        price = price.strip()[:-1]
        return jsonify({"name": title, "price": price})
    except:
        return jsonify({"error"})


def getAmznImage(url):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"}

        resp = requests.get(url, headers=headers)
        soup = BeautifulSoup(resp.content, 'html.parser')
        img_div = soup.find(id="imgTagWrapperId")
        img_str = img_div.img.get('src')
        return jsonify({"image": img_str})

    except Exception as e:
        # print("Error in extracting image :", e)
        return None


def scrap_flipkart(URL):
    try:
        FLIPKART_API_URL = "https://flipkart.dvishal485.workers.dev/product/min/"
        if "http" in URL:
            URL = URL.replace("https://www.flipkart.com/", "")
        elif "http" not in URL and "www" in URL:
            URL = URL.replace("www.flipkart.com/", "")
        page = requests.get(FLIPKART_API_URL + URL)
        product_data = page.json()
        title = product_data["name"]
        price = product_data["current_price"]
        return jsonify({"name": title, "price": price})

    except:
        return jsonify({"error"})
