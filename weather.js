//GET CURRENT DATE
function formatDate(today) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let day = days[today.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let month = months[today.getMonth()];

  let date = today.getDate();

  return `${day}, ${month} ${date}`;
}

let today = new Date();

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(today);

//API KEY & BASEPOINT
let apiKey = "1bac80fa0c32ft537387a483f19bf3fo";
let apiBase = "https://api.shecodes.io/weather/v1/";

//GET USER'S CITY WEATHER DATA
function searchUserCity(userCity) {
  let currentWeather = `${apiBase}current?query=${userCity}&key=${apiKey}&units=imperial`;
  axios.get(currentWeather).then(displayCurrentWeather);

  let forecast = `${apiBase}forecast?query=${userCity}&key=${apiKey}&units=imperial`;
  axios.get(forecast).then(displayForecast);
}

searchUserCity("Atlanta");

//USER SUBMITS FORM
function getUserCity(event) {
  event.preventDefault();

  let userCity = document.querySelector("#city-search");

  searchUserCity(userCity.value);
}

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", getUserCity);

//DISPLAY CURRENT WEATHER
function displayCurrentWeather(response) {
  let city = document.querySelector("h1");
  city.innerHTML = response.data.city;

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" />`;

  let currentTemp = document.querySelector("#current-temp");
  let roundedTemp = Math.round(response.data.temperature.current);
  currentTemp.innerHTML = roundedTemp;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.condition.description;

  let windSpeed = document.querySelector("#wind-speed");
  let roundedWindSpeed = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `Wind speed: ${roundedWindSpeed} mph`;

  let humidity = document.querySelector("#humidity");
  let apiHumidity = response.data.temperature.humidity;
  humidity.innerHTML = `Humidity: ${apiHumidity}%`;

  console.log(response.data);
}

//DISPLAY FORECAST
function displayForecast(response) {
  let forecastDisplay = document.querySelector("#forecast-display");
  forecastDisplay.innerHTML = `
          <ul>
            <li>Monday</li>
            <li>☀️</li>
            <li>50° | 48°</li>
          </ul>`;

  console.log(response.data);
}
