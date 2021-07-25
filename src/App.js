import "./App.css";
import "./Components/Responsive.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import heart from "./Images/heart.png";
import remove from "./Images/delete.png";
import CardView from "./Components/CardView";

const getData = () => {
  var localstoragedata = localStorage.getItem("queryies")
  if (localstoragedata) {
    return JSON.parse(localstoragedata);
  }
  else {
    return [];
  }
}

function App() {
  const Api_key = "8691eb734123a777487351b5d9f298d2";
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [data, setData] = useState([]);
  const [storecities, setStorecities] = useState([]);
  const [cities, setCities] = useState(getData());
  const [cldata, setCldata] = useState([]);
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const LocationSuccess = (location) => {
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(LocationSuccess);
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=daily&appid=${Api_key}`
      )
      .then((res) => {
        const response = res.data;
        setCldata(response.current);
      });
  }, [location]);

  const submit = async () => {
    const weatherReport = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_key}`
    );
    const response = await weatherReport.json();
    setData(response);
  };

  const favourite = () => {
    if (
      cities.filter((item) => item[0] === data.name).length === 0 ||
      cities.length === 0
    ) {
      setCities([...cities, [data.name, data.sys.country]]);
    }
  };
  useEffect(() => {
    localStorage.setItem("queryies", JSON.stringify(cities));
    const data = localStorage.getItem("queryies");
    setStorecities(JSON.parse(data));
  }, [cities]);

  const Checkfavourite = async (ci, con) => {
    const weatherReport = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ci},${con}&appid=${Api_key}`
    );
    const response = await weatherReport.json();
    setData(response);
  };

  const removefav = (cty, cntry) => {
    const item = storecities.filter((item) => item[0] !== cty);
    setCities(item);
  };

  return (
    <div
      className={
        data.cod === "404" || data.length === 0
          ? "container"
          : `${data.weather[0].main}`
      }
    >
      <h1 style={{ color: "white" }}>Weather Checker</h1>

      {cldata.length === 0 ? (
        <div className='current_location'>
          <h3
            className='current_location_data'
            style={{ color: "white", fontWeight: "bolder" }}
          >
            Something went Wrong
          </h3>
        </div>
      ) : (
        <div className='current_location'>
          <div className='current_location_data'>
            <h3 style={{ color: "white", fontWeight: "bolder" }}>
              Your Weather
            </h3>
            <h4>Temperature: {Math.round(cldata.temp / 10)}°C</h4>
            <h5>
              Sunrise:{" "}
              {new Date(cldata.sunrise * 1000).toLocaleTimeString()}
            </h5>
            <h5>
              Sunset:{" "}
              {new Date(cldata.sunset * 1000).toLocaleTimeString()}
            </h5>
            <h5>Description: {cldata.weather[0].main}</h5>
            <h5>Humidity: {cldata.humidity}%</h5>
            <h5>Wind Speed: {cldata.wind_speed}</h5>
          </div>
        </div>
      )}

      <div className='form'>
        <input
          type='search'
          defaultValue=''
          placeholder='Search City'
          autoComplete='small'
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <input
          type='search'
          defaultValue=''
          placeholder='Search Country'
          autoComplete='small'
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />

        <button
          type='submit'
          onClick={() => submit()}
          className='btn'
          type='submit'
        >
          Go
        </button>
      </div>
      <CardView wreport={data} favourite={favourite} />
      <div className='favourite'>
        {storecities.map((query, index) => (
          <div key={index} className='fav_card_holder'>
            <div className='fav_card'>
              <div className='fav_icon'>
                <img src={heart} height='20px' width='20px'></img>
                <img
                  onClick={() => {
                    removefav(query[0], query[1]);
                  }}
                  src={remove}
                  height='20px'
                  width='20px'
                ></img>
              </div>
              <div
                className='cityinfo'
                onClick={() => {
                  Checkfavourite(query[0], query[1]);
                }}
              >
                <h3 className='card'>{query[0] + ", " + query[1]}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
