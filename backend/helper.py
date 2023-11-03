from flask import jsonify
import requests
import json
from bs4 import BeautifulSoup


def scrap_amazon(name):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"}
        URL = "https://www.amazon.in/s?k=" + \
            str(name) + "&ref=nb_sb_noss_2"
        recieve = requests.get(URL, headers=headers)
        soup = BeautifulSoup(recieve.content, 'html.parser')

        title = soup.find(
            "span", {"class": "a-size-medium a-color-base a-text-normal"}).text

        parent_price = soup.find(
            'div', class_='a-row a-size-base a-color-base')
        price = parent_price.find('span', class_='a-price-whole').text
        image = soup.find('img', attrs={'class': 's-image'})
        imagelink = image['src']
        rating_text = soup.find('i', attrs={
                                'class': 'a-icon a-icon-star-small a-star-small-4-5 aok-align-bottom'}).text
        parts = rating_text.split(" out of ")
        rating = parts[0]
        reviews = soup.find(
            "span", {"class": "a-size-base s-underline-text"}).text
        return jsonify({"name": title, "price": price, "image": imagelink, "rating": rating, "reviews": reviews})
    except:
        return jsonify({"error": "Not Found"})


def scrap_flipkart(name):
    try:
        headers = {
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
            'Sec-Fetch-User': '?1',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'navigate',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8,nl;q=0.7',
        }
        url = "https://www.flipkart.com/search?q=" + str(
            name) + "&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off"
        r = requests.get(url, headers=headers)
        r = r.text
        soup = BeautifulSoup(r, 'lxml')
        title = soup.find('div', {'class': '_4rR01T'}).text
        price = soup.find('div', {'class': '_30jeq3 _1_WHN1'}
                          ).text.replace("₹", "")
        image = soup.find('img', attrs={'class': '_396cs4'})
        imagelink = image['src']
        rating = soup.find('div', {'class': '_3LWZlK'}).text
        reviews = soup.find('span', {'class': '_2_R_DZ'}).text
        parts = reviews.split('&')
        reviews_part = parts[1]
        reviews = reviews_part.strip().split()[0]
        return jsonify({"name": title, "price": price, "image": imagelink, "rating": rating, "reviews": reviews})

    except:
        return jsonify({"error": "Not Found"})
