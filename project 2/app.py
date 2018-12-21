import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask_pymongo import PyMongo
import scrape_file

from flask import Flask, jsonify, render_template, redirect


app = Flask(__name__)

engine = create_engine("sqlite:///dataupdated.sqlite")
Base = automap_base()
Base.prepare(engine, reflect=True)
Data = Base.classes.data

app.config["MONGO_URI"]="mongodb://localhost:27017/project_app"
mongo = PyMongo(app)


@app.route("/")
def index():
    shopping = mongo.db.shopping.find()
    return render_template("index.html", shopping = shopping)

#@app.route("/storelatlon/<data>")
#def index():
    #shopping = mongo.db.shopping.find()
    #return render_template("index.html", shopping = shopping)

@app.route("/forecast")
def forecast():
    """Return a list of all data """
    session = Session(engine)
    #build Data class
    results = session.query(Data).all()

    all_data = []
    for data in results:
        data_dict = {}
        data_dict["station_id"] = data.station_id
        data_dict["station_name"] = data.station_name
        data_dict["state"] = data.state
        data_dict["country"] = data.country
        data_dict["production_date"] = data.production_date
        data_dict["forecast_date"] = data.forecast_date
        data_dict["lat"] = data.lat
        data_dict["lon"] = data.lon
        data_dict["fcst_avg"] = data.fcst_avg
        data_dict["norm_mn"] = data.norm_mn
        data_dict["norm_mx"] = data.norm_mx
        all_data.append(data_dict)
    session.close()
    return jsonify(all_data)


@app.route("/scrape")
def scrape():
    mongo.db.shopping.delete_many({})
    shopping = mongo.db.shopping

    jackets = scrape_file.scrape_one()
    jeans = scrape_file.scrape_two()
    shoes = scrape_file.scrape_three()

    shoppingdict = {

        "Jacket_Title": jackets["title"],
        "Jacket_Image": jackets["image"],
        "Jacket_URL":jackets["url"],
        "Jean_Title": jeans["title"],
        "Jean_Image": jeans["image"],
        "Jean_URL":jeans["url"],
        "Shoes_Title": shoes["title"],
        "Shoes_Image": shoes["image"],
        "Shoes_URL":shoes["url"]
    }

    shopping.update({}, shoppingdict, upsert=True)

    return redirect("/", code = 302)

@app.route("/scrapetwo")
def scrapetwo():
    mongo.db.shopping.delete_many({})
    shopping = mongo.db.shopping

    shorts  = scrape_file.scrape_four()
    polo = scrape_file.scrape_five()
    sandals = scrape_file.scrape_six()

    shoppingdict = {

        "Shorts_Title": shorts["title"],
        "Shorts_Image": shorts["image"],
        "Shorts_URL": shorts["url"],
        "Polo_Title": polo["title"],
        "Polo_Image": polo["image"],
        "Polo_URL": polo["url"],
        "Sandals_Title": sandals["title"],
        "Sandals_Image": sandals["image"],
        "Sandals_URL": sandals["url"]
    }

    shopping.update({}, shoppingdict, upsert=True)

    return redirect("/", code = 302)

@app.route("/scrapethree")
def scrapethree():
    mongo.db.shopping.delete_many({})
    shopping = mongo.db.shopping

    dress_shirt  = scrape_file.scrape_seven()
    dress_pant = scrape_file.scrape_eight()
    dress_shoe = scrape_file.scrape_nine()

    shoppingdict = {

        "DShirt_Title": dress_shirt["title"],
        "DShirt_Image": dress_shirt["image"],
        "DShirt_URL": dress_shirt["url"],
        "DP_Title": dress_pant["title"],
        "DP_Image": dress_pant["image"],
        "DP_URL": dress_pant["url"],
        "DS_Title": dress_shoe["title"],
        "DS_Image": dress_shoe["image"],
        "DS_URL": dress_shoe["url"]
    }

    shopping.update({}, shoppingdict, upsert=True)
    #return jsonify(shoppingdict)
    return redirect("/", code = 302)


if __name__ == "__main__":
   app.run(debug=True)