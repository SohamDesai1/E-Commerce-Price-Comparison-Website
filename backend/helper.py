from flask import jsonify
import requests
import random
from bs4 import BeautifulSoup
from selenium_scrap import amazon_selenium_scrap, flipkart_selenium_scrap


def scrap_amazon(name):
    user_agents = [
    {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36','DNT': '1',"accept":"gzip, deflate, br",'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'Sec-Fetch-Site': 'same-origin',},
    {'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36','DNT' : '1','Accept' : 'text/html,application/xhtml+xml',"accept":"gzip"},
    {'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36','DNT' : '1','Accept' : 'text/html,application/xml;q=0.9,*/*;q=0.8', },
    {'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36','DNT' : '1','Accept' : 'texthtml,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',"accept":"gzip",'Accept-Encoding': 'gzip, deflate, br','Sec-Fetch-Site':'same-origin', },
    {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'navigate',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8,nl;q=0.7', 'DNT' : '1'}
    ]
    headers_a = random.choice(user_agents)
    url_a = "https://www.amazon.in/s?k=" + \
        str(name) + "&ref=nb_sb_noss_2"
    recieve_a = requests.get(url_a, headers=headers_a)
    # print(recieve.content)
    soup = BeautifulSoup(recieve_a.content, 'html.parser')
    try:
        title_a = soup.find(
            "span", {"class": "a-size-medium a-color-base a-text-normal"}).text
        parent_price_a = soup.find(
            'div', class_='a-row a-size-base a-color-base')
        price_a = parent_price_a.find('span', class_='a-price-whole').text
        # print("Amazon:", price_a)
        image_a = soup.find('img', attrs={'class': 's-image'})
        imagelink_a = image_a['src']
        # print(imagelink_a)
        rating_text_a = soup.find('span', attrs={
                                'class': 'a-icon-alt'}).text
        parts_a = rating_text_a.split(" out of ")
        rating_a = parts_a[0]
        reviews_a = soup.find(
            "span", {"class": "a-size-base s-underline-text"}).text
        return jsonify({"name": title_a, "price": price_a, "image": imagelink_a, "rating": rating_a, "reviews": reviews_a})
    
    except:
        data = amazon_selenium_scrap(name)
        return data
    
    
    
def scrap_flipkart(name):
    try:
        user_agents = [{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36','DNT' : '1',"accept":"gzip, deflate, br",'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'Sec-Fetch-Site': 'same-origin',},
        {'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36','DNT' : '1','Accept' : 'text/html,application/xhtml+xml',"accept":"gzip"},
        {'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36','DNT' : '1','Accept' : 'text/html,application/xml;q=0.9,*/*;q=0.8', },
        {'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36','DNT' : '1','Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',"accept":"gzip",'Accept-Encoding': 'gzip, deflate, br','Sec-Fetch-Site': 'same-origin', },
        {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'navigate',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8,nl;q=0.7', 'DNT' : '1'}
        ]
        headers_f = random.choice(user_agents)
        url_f = "https://www.flipkart.com/search?q=" + str(
            name) + "&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off"
        r_f = requests.get(url_f, headers=headers_f)
        r_f = r_f.text
        soup_f = BeautifulSoup(r_f, 'lxml')
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
        data = flipkart_selenium_scrap(name)
        return data
        
