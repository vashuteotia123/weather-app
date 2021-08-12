const request = require('request');
const chalk = require('chalk');

// const city_name = process.argv[2];
const forecast = (city_name, callback) => {
  if (!city_name) {
    callback('Please provide city name', undefined);
  } else {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=ff72e59041516b97edce5e57d38a02f4`;

    request({ url: url, json: true }, (error, response) => {
      if (error) {
        callback("Can't connect to weather service ", undefined);
      } else if (response.body.cod === '404') {
        callback('Please check the city name', undefined);
      } else {
        callback(undefined, 
          {
            Location: response.body.name + ', ' + response.body.sys.country,
            Weather: response.body.weather[0].description,
            Temperature: (response.body.main.temp - 273).toFixed(2) + ' C',
            Feels_like: (response.body.main.feels_like - 273).toFixed(2) + ' C',
            Humidity: response.body.main.humidity + '%',
          }
        );
      }
    });
  }
};

module.exports = forecast;
//mapbox geolocation api use using location name
// const url1 =
//   'https://api.mapbox.com/geocoding/v5/mapbox.places/Meerut.json?limit=1&access_token=pk.eyJ1IjoidmFzaHV0ZW90aWExMjMiLCJhIjoiY2tydnYyZXc4MGFkcDJxbnEwemIxNWF0OCJ9.KsiI0uUVBkzX3eKfdnHLYg';

// request({ url: url1, json: true }, (error, response) => {
//   if (error) {
//     console.log("Can't connect to geo service right now");
//   } else {
//     console.log(response.body);
//   }
// });
