//GET CURRENT DATE
function formatDate(today) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[today.getDay()];

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
