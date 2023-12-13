from flask import jsonify
import requests
import json
from bs4 import BeautifulSoup


def scrap_amazon(name):
    try:
        headers_a = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"}
        URL_a = "https://www.amazon.in/s?k=" + \
            str(name) + "&ref=nb_sb_noss_2"
        recieve_a = requests.get(URL_a, headers=headers_a)
        soup_a = BeautifulSoup(recieve_a.content, 'html.parser')
        title_a = soup_a.find(
            "span", {"class": "a-size-medium a-color-base a-text-normal"}).text
        parent_price_a = soup_a.find(
            'div', class_='a-row a-size-base a-color-base')
        price_a = parent_price_a.f_find('span', class_='a-price-whole').text
        image_a = soup_a.find('img', attrs={'class': 's-image'})
        imagelink_a = image_a['src']
        rating_text_a = soup_a.find('span', attrs={
                                'class': 'a-icon-alt'}).text
        parts_a = rating_text_a.split(" out of ")
        rating_a = parts_a[0]
        reviews_a = soup_a.find(
            "span", {"class": "a-size-base s-underline-text"}).text
        return jsonify({"name": title_a, "price": price_a, "image": imagelink_a, "rating": rating_a, "reviews": reviews_a})
    except:
        return jsonify({"error": "Not Found"})


def scrap_flipkart(name):
    try:
        headers_f = {
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
        url_f = "https://www.flipkart.com/search?q=" + str(
            name) + "&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off"
        r_f = requests.get(url_f, headers=headers_f)
        r_f = r_f.text
        soup_f = BeautifulSoup(r, 'lxml')
        title_f = soup_f.find('div', {'class': '_4rR01T'}).text
        price_f = soup_f.find('div', {'class': '_30jeq3 _1_WHN1'}
                          ).text.replace("₹", "")
        print(price_f)
        image_f = soup_f.find('img', attrs={'class': '_396cs4'})
        imagelink_f = image_f['src']
        rating_f = soup_f.find('div', {'class': '_3LWZlK'}).text
        reviews_f = soup_f.find('span', {'class': '_2_R_DZ'}).text
        parts_f = reviews_f.split('&')
        reviews_part_f = parts_f[1]
        reviews_f = reviews_part_f.strip().split()[0]
        return jsonify({"name": title_f, "price": price_f, "image": imagelink_f, "rating": rating_f, "reviews": reviews_f})

    except:
        return jsonify({"error": "Not Found"})
