import React from "react";
import heart from "../Images/heart.png";

const CardView = ({ wreport, favourite }) => {
  console.log("From Card", wreport);
  const CurrentDate = (d) => {
    var month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var day = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    var bar = day[d.getDay()];
    var cdate = d.getDate();
    var cmonth = month[d.getMonth()];
    var cyear = d.getFullYear();

    var currdate = bar + ", " + cdate + "-" + cmonth + "-" + cyear;

    return currdate;
  };

  return (
    <div>
      {typeof wreport.main === "undefined" ? (
        <div className='main'>
          <div className='glass'>
            <div className='card'>
              <div>
                <h3
                  style={{
                    textAlign: "center",
                    margin: "25%",
                  }}
                >
                  Check your internet connection or wrong city/country searched.
                </h3>
              </div>
              <div style={{ padding: "30px 5px" }}>
                <img className='heart' src={heart} height='20px' />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='main'>
          <div className='glass'>
            <div className='card'>
              <div>
                <h2>
                  {wreport.name}, {wreport.sys.country}
                </h2>
                <h3>{Math.round(wreport.main.temp / 10)}°C</h3>
                <p>{CurrentDate(new Date())}</p>
                <p>
                  Sunrise:{" "}
                  {new Date(wreport.sys.sunrise * 1000).toLocaleTimeString()}
                </p>
                <p>
                  Sunrise:{" "}
                  {new Date(wreport.sys.sunset * 1000).toLocaleTimeString()}
                </p>
                <p>Description: {wreport.weather[0].main}</p>
                <p>Humidity: {wreport.main.humidity}%</p>
                <p>Wind: {wreport.wind.speed}</p>
              </div>
              <div style={{ padding: "30px 5px" }}>
                <img
                  onClick={() => {
                    favourite();
                  }}
                  className='heart'
                  src={heart}
                  height='20px'
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardView;
