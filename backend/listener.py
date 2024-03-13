from dotenv import load_dotenv
from flask import jsonify
import requests
import random
from bs4 import BeautifulSoup
from selenium_scrap import amazon_selenium_scrap, flipkart_selenium_scrap
import ssl
import smtplib
import os
from email.mime.text import MIMEText

load_dotenv()

def price_amazon(name):
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
        parent_price_a = soup.find(
            'div', class_='a-row a-size-base a-color-base')
        price_a = parent_price_a.find('span', class_='a-price-whole').text
        return price_a
    
    except:
        try:
            data = amazon_selenium_scrap(name)
            return data
        except:
            return jsonify({"name": "not found", "price": "not found", "image": "not found", "rating": "not found", "reviews": "not found"})
    

def price_flipkart(name):
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
        price_f = soup_f.find('div', {'class': '_30jeq3 _1_WHN1'}
                          ).text.replace("₹", "")
        return price_f
    
    except:
        data = flipkart_selenium_scrap(name)
        return data.price

def sendMail(user_email, product_title, product_price, product_link):
    try:
        port = 465  # For SSL
        smtp_server = "smtp.gmail.com"
        sender_email = os.getenv("SENDER_EMAIL_ID")
        receiver_email = user_email
        password = os.getenv("SENDER_EMAIL_PASSWORD")
        FROM = "Trackky"
        SUBJECT = "ALERT!! Price Drop for your Product"

        with open("email.txt", "r") as file:
            TEXT = file.read()
        TEXT = TEXT.format(product_title=product_title,
                           product_price=product_price,
                           product_link=product_link)
        message = MIMEText(TEXT, 'html', 'utf-8')
        message['From'] = FROM
        message['Subject'] = SUBJECT

        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, message.as_string())
            print("Email sent")
            
    except Exception as e:
        print(e)
        