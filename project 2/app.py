import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template


#################################################
# Flask Setup
#################################################
app = Flask(__name__)

engine = create_engine("sqlite:///data.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables

Base.prepare(engine, reflect=True)

# Save reference to the table
Data = Base.classes.data

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/names")
def names():

  # Query all station_name
  session = Session(engine)
  results = session.query(Data.station_name).all()

  # Convert list of tuples into normal list
  all_names = list(np.ravel(results))
  session.close()

  return jsonify(all_names)

@app.route("/data/<station_name>")
def station_metadata(station_name):
    """Return the MetaData for a given station."""
    session=Session(engine)

    sel = [
        Data.station_id,
        Data.state,
        Data.country,
        Data.production_date,
        Data.fcst_avg,
        Data.norm_mn,
        Data.norm_mx,
    ]
    results = session.query(*sel).filter(Data.station_name == station_name).all()
    print(results)
    # Create a dictionary entry for each row of metadata information
    station_metadata = {}
    for result in results:
        station_metadata["station_id"] = result[0]
        station_metadata["station_name"] = result[1]
        station_metadata["state"] = result[2]
        station_metadata["country"] = result[3]
        station_metadata["production_date"] = result[4]
        station_metadata["fcst_avg"] = result[5]
        station_metadata["norm_mn"] = result[6]
        station_metadata["norm_mx"] = result[7]

    print(station_metadata)
    session.close()
    return jsonify(station_metadata)

@app.route("/forecast")
def forecast():
    """Return a list of all data """


#build Data class
    session = Session(engine)
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

if __name__ == "__main__":
   app.run(debug=True)