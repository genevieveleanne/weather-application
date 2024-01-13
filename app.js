//Display User's Current Date
function formatDate(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];

  let months = [
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

  let month = months[currentDate.getMonth()];

  let date = currentDate.getDate();

  let year = currentDate.getFullYear();

  return `${day}, ${month} ${date}, ${year}`;
}

let currentDate = new Date();

let dateDisplay = document.querySelector("#current-date");
dateDisplay.innerHTML = formatDate(currentDate);

//API key and basepoint
let apiKey = "1bac80fa0c32ft537387a483f19bf3fo";
let apiBase = "https://api.shecodes.io/weather/v1/";

// Display Current Weather for Atlanta on Page Load
function searchCity(city) {
  let currentWeather = `${apiBase}/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(currentWeather).then(displayUserInput);

  let forecast = `${apiBase}/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(forecast).then(displayForecast);
}

searchCity("Atlanta");

//User Submits Form
function retrieveUserInput(event) {
  event.preventDefault();

  let userCity = document.querySelector("#user-city");

  searchCity(userCity.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", retrieveUserInput);

//Display Current Weather Information
function displayUserInput(response) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.city;

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  let description = response.data.condition.description;
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${description}`;

  let currentTemperature = Math.round(response.data.temperature.current);
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = `${currentTemperature}°F`;

  let feelsTemp = Math.round(response.data.temperature.feels_like);
  let feelsTempElement = document.querySelector("#feels-like");
  feelsTempElement.innerHTML = `${feelsTemp}`;

  let humidity = response.data.temperature.humidity;
  let humidityListItem = document.querySelector("#humidity");
  humidityListItem.innerHTML = `${humidity}`;

  let windSpeed = Math.round(response.data.wind.speed);
  let windListItem = document.querySelector("#wind-speed");
  windListItem.innerHTML = `${windSpeed}`;
}

//User Clicks on Current Location Button
function retrievePosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let currentLocation = `${apiBase}/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=imperial`;
  axios.get(currentLocation).then(displayUserInput);

  let forecast = `${apiBase}/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=imperial`;
  axios.get(forecast).then(displayForecast);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", retrievePosition);

//Format Day for Forecast
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

//5-Day Forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast-row");

  let forecastHTML = `<div class="row forecast-row">`;

  function showForecast(forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
    <h5>${formatForecastDay(forecastDay.time)}</h5>
    <div class="forecast-container">
    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
      forecastDay.condition.icon
    }.png" alt="Weather Icon" class="forecast-icon"/>
      </div>
    
    <ul class="forecast-list">
      <li class="forecast-temperature d-none d-md-inline">High: ${Math.round(
        forecastDay.temperature.maximum
      )}°</li>
      <li class="forecast-temperature d-none d-md-inline">Low: ${Math.round(
        forecastDay.temperature.minimum
      )}°</li>
    </ul>
    </div>`;
    }
  }

  let forecast = response.data.daily;
  forecast.forEach(showForecast);

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
