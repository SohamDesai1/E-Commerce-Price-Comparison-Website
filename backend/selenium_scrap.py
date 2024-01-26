from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By

chrome_options = webdriver.ChromeOptions()
 
# Activate headless mode
chrome_options.add_argument('--headless=new')
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')
driver = webdriver.Chrome(options=chrome_options)
 
driver.get("https://www.amazon.in/s?k=" + \
        str(input("Enter the product name: ")) + "&ref=nb_sb_noss_2")

driver.implicitly_wait(10)

soup = BeautifulSoup(driver.page_source, 'html.parser') 
parent_price = soup.find(
        'div', class_='a-row a-size-base a-color-base')
price = parent_price.find('span', class_='a-price-whole').text

print(price)
driver.quit()