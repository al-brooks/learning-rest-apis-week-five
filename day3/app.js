const displayWeather = document.getElementById('displayWeather');
const cityText = document.getElementById('cityText');
const searchBtn = document.getElementById('searchBtn');

// complete: Fetch function

function getWeatherData(weatherFetched, city) {
  const searchCity = city.toLowerCase();
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=45707788eec4bfd8a60d8a7d7afade47&units=imperial`
  )
    .then((response) => {
      return response.json();
    })
    .then((weather) => {
      weatherFetched(weather);
    })
    .catch((error) => {
      console.log('error with request');
    });
}

// complete: Display Weather Info
function displayWeatherInfo(weather) {
  const info = `
        <span>City: ${weather.name}</span>
        <span>Minimum Temp: ${weather.main.temp_min}</span>
        <span>Maximum Temp: ${weather.main.temp_max}</span>
        <span>Wind Pressure:${weather.main.pressure}</span>
      `;

  displayWeather.innerHTML = info;
}

// complete: Allow user to search by city name
searchBtn.addEventListener('click', function () {
  const cityLookup = cityText.value;
  getWeatherData(function (weather) {
    displayWeatherInfo(weather);
  }, cityLookup);
});

// to-do: find user coordinates and fetch weather based on user location.
