from splinter import Browser
from bs4 import BeautifulSoup
import pandas as pd 

def init_browser():
    executable_path = {'executable_path': 'chromedriver.exe'}
    return Browser('chrome', **executable_path, headless=False)

def scrape_one():
    browser = init_browser()

    url = "https://www.bloomingdales.com/shop/product/marc-new-york-holden-down-parka-jacket?ID=3141068&RecProdZonePos=prodrec-1&LinkType=prodrec_pdpza&RecProdZoneDesc=RR-CMIO-RT-POC|RR-CMIO|prodrec_pdpza|RR/"

    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    #bloomingdales jacket site
    jacket_image = soup.find('li', class_='main-image')

    link = jacket_image.find('img', class_='main-image-img')
    imageurl = link['src']
    title = link['title']

    jackets = { "title": title, "image": imageurl, "url": url}

    return jackets

def scrape_two():
    browser = init_browser()

    url = "https://www.bloomingdales.com/shop/product/frame-lhomme-slim-fit-jeans-in-blue-bay?ID=3147186&CategoryID=10172#fn=ppp%3Dundefined%26sp%3DNULL%26rId%3DNULL%26spc%3D554%26spp%3D1%26pn%3D1%7C6%7C1%7C554%26rsid%3Dundefined%26smp%3DmatchNone/"

    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    #bloomingdales jeans
    jeans_image = soup.find("li", class_="main-image")

    link = jeans_image.find('img', class_= "main-image-img")
    imageurl = link["src"]
    title = link["title"]

    jeans = {"title": title, "image": imageurl, "url": url}

    return jeans

def scrape_three():
    browser = init_browser()

    url = "https://www.bloomingdales.com/shop/product/john-varvatos-star-usa-mens-zander-suede-chukka-boots?ID=3107596&CategoryID=1000046#fn=ppp%3Dundefined%26sp%3DNULL%26rId%3DNULL%26spc%3D159%26spp%3D4%26pn%3D1%7C2%7C4%7C159%26rsid%3Dundefined%26smp%3DmatchNone/"

    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    #bloomingdales shoes
    shoes_image = soup.find("li", class_="main-image")

    link = shoes_image.find('img', class_= "main-image-img")
    imageurl = link["src"]
    title = link["title"]

    shoes = {"title": title, "image": imageurl, "url": url}

    return shoes

def scrape_four():
    browser = init_browser()

    url = "https://www.bloomingdales.com/shop/product/rag-bone-standard-issue-chino-shorts-in-stone?ID=2517525&CategoryID=11576#fn=ppp%3Dundefined%26sp%3DNULL%26rId%3DNULL%26spc%3D141%26spp%3D5%26pn%3D1%7C2%7C5%7C141%26rsid%3Dundefined%26smp%3DmatchNone/"

    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    #bloomingdales shorts
    shorts_image = soup.find("li", class_="main-image")

    link = shorts_image.find('img', class_= "main-image-img")
    imageurl = link["src"]
    title = link["title"]

    shorts = {"title": title, "image": imageurl, "url": url}

    return shorts

def scrape_five():
    browser = init_browser()

    url = "https://www.bloomingdales.com/shop/product/lacoste-pique-polo-classic-fit?ID=3209107&CategoryID=1000663#fn=ppp%3Dundefined%26sp%3DNULL%26rId%3DNULL%26spc%3D262%26spp%3D1%26pn%3D1%7C3%7C1%7C262%26rsid%3Dundefined%26smp%3DmatchNone/"

    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    #bloomingdales polo
    polo_image = soup.find("li", class_="main-image")

    link = polo_image.find('img', class_= "main-image-img")
    imageurl = link["src"]
    title = link["title"]

    polo = {"title": title, "image": imageurl, "url": url}

    return polo

def scrape_six():
    browser = init_browser()

    url = "https://www.bloomingdales.com/shop/product/adidas-mens-adilette-slide-sandals?ID=2844743&CategoryID=1000051#fn=ppp%3Dundefined%26sp%3DNULL%26rId%3DNULL%26spc%3D54%26spp%3D3%26pn%3D1%7C1%7C3%7C54%26rsid%3Dundefined%26smp%3DmatchNone/"

    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    #bloomingdales sandals
    sandals_image = soup.find("li", class_="main-image")

    link = sandals_image.find('img', class_= "main-image-img")
    imageurl = link["src"]
    title = link["title"]

    sandals = {"title": title, "image": imageurl, "url": url}

    return sandals

def scrape_seven():
    browser = init_browser()

    url = "https://www.bloomingdales.com/shop/product/turnbull-asser-micro-check-classic-fit-dress-shirt?ID=1573627&CategoryID=17647#fn=ppp%3Dundefined%26sp%3DNULL%26rId%3DNULL%26spc%3D270%26spp%3D7%26rsid%3Dundefined%26smp%3DmatchNone/"

    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    #bloomingdales dress shirt
    dress_shirt_image = soup.find("li", class_="main-image")

    link = dress_shirt_image.find('img', class_= "main-image-img")
    imageurl = link["src"]
    title = link["title"]

    dress_shirt = {"title": title, "image": imageurl, "url": url}

    return dress_shirt

def scrape_eight():
    browser = init_browser()

    url = "https://www.bloomingdales.com/shop/product/polo-ralph-lauren-stretch-classic-fit-chino-pants?ID=1635314&CategoryID=10189#fn=ppp%3Dundefined%26sp%3DNULL%26rId%3DNULL%26spc%3D567%26spp%3D2%26pn%3D1%7C6%7C2%7C567%26rsid%3Dundefined%26smp%3DmatchNone/"

    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    #bloomingdales dress pant
    dress_pant_image = soup.find("li", class_="main-image")

    link = dress_pant_image.find('img', class_= "main-image-img")
    imageurl = link["src"]
    title = link["title"]

    dress_pant = {"title": title, "image": imageurl, "url": url}

    return dress_pant

def scrape_nine():
    browser = init_browser()

    url = "https://www.bloomingdales.com/shop/product/ted-baker-mens-jhorge-mixed-leather-plain-toe-oxfords?ID=3097963&CategoryID=1001183#fn=ppp%3Dundefined%26sp%3DNULL%26rId%3DNULL%26spc%3D217%26spp%3D1%26pn%3D1%7C3%7C1%7C217%26rsid%3Dundefined%26smp%3DmatchNone/"

    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    #bloomingdales dress shoe
    dress_shoe_image = soup.find("li", class_="main-image")

    link = dress_shoe_image.find('img', class_= "main-image-img")
    imageurl = link["src"]
    title = link["title"]

    dress_shoe = {"title": title, "image": imageurl, "url": url}

    return dress_shoe