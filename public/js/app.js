const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const errorMessage = document.querySelector('#errorMessage');
const locationMessage = document.querySelector('#locationMessage');
const weather = document.querySelector('#weather');
const temperature = document.querySelector('#temperature');
const feels_like = document.querySelector('#feels_like');
const humidity = document.querySelector('#humidity');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = searchElement.value;
  errorMessage.textContent = 'Loading...';
  locationMessage.textContent = '';
  weather.textContent = '';
  temperature.textContent = '';
  feels_like.textContent = '';
  humidity.textContent = '';
  fetch('/weather?cityname=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        errorMessage.textContent = data.error;
        locationMessage.textContent = '';
        weather.textContent = '';
        temperature.textContent = '';
        feels_like.textContent = '';
        humidity.textContent = '';
      } else {
        errorMessage.textContent = '';
        locationMessage.textContent = 'Location : ' + data.forecast.Location;
        weather.textContent = 'Weather : ' + data.forecast.Weather;
        temperature.textContent = 'Temperature : ' + data.forecast.Temperature;
        feels_like.textContent = 'Feels Like : ' + data.forecast.Feels_like;
        humidity.textContent = 'Humidity : ' + data.forecast.Humidity;
      }
    });
  });
});
