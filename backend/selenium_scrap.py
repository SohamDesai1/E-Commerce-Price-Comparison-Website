from bs4 import BeautifulSoup
from flask import jsonify
from selenium import webdriver

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless=new')
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')
driver = webdriver.Chrome(options=chrome_options)

def amazon_selenium_scrap(name):
    try:
        driver.get("https://www.amazon.in/s?k=" + \
                str(name) + "&ref=nb_sb_noss_2")
        driver.implicitly_wait(2)
        soup_a = BeautifulSoup(driver.page_source, 'html.parser')
        title_a = soup_a.find(
            "span", {"class": "a-size-medium a-color-base a-text-normal"}).text
        parent_price_a = soup_a.find(
            'div', class_='a-row a-size-base a-color-base')
        price_a = parent_price_a.find('span', class_='a-price-whole').text
        # print("Amazon:", price_a)
        image_a = soup_a.find('img', attrs={'class': 's-image'})
        imagelink_a = image_a['src']
        # print(imagelink_a)
        rating_text_a = soup_a.find('span', attrs={
                                'class': 'a-icon-alt'}).text
        parts_a = rating_text_a.split(" out of ")
        rating_a = parts_a[0]
        reviews_a = soup_a.find(
            "span", {"class": "a-size-base s-underline-text"}).text
        return jsonify({"name": title_a, "price": price_a, "image": imagelink_a, "rating": rating_a, "reviews": reviews_a})
    except:
        driver.quit()
        return jsonify({"name": "not found", "price": "not found", "image": "not found", "rating": "not found", "reviews": "not found"})
    
def flipkart_selenium_scrap(name):
    
        driver.get("https://www.flipkart.com/search?q=" + str(
            name) + "&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off")
        driver.implicitly_wait(2)
        soup_f = BeautifulSoup(driver.page_source, 'lxml')
        title_f = soup_f.find('div', {'class': 'KzDlHZ'}).text
        price_f = soup_f.find('div', {'class': 'Nx9bqj _4b5DiR'}
                          ).text.replace("₹", "")
        # print(price_f)
        image_f = soup_f.find('img', attrs={'class': 'DByuf4'})
        imagelink_f = image_f['src']
        rating_f = soup_f.find('div', {'class': 'XQDdHH'}).text
        reviews_f = soup_f.find('span', {'class': 'Wphh3N'}).text
        parts_f = reviews_f.split('&')
        reviews_part_f = parts_f[1]
        reviews_f = reviews_part_f.strip().split()[0]
        return jsonify({"name": title_f, "price": price_f, "image": imagelink_f, "rating": rating_f, "reviews": reviews_f})
    
