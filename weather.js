//Step 3: Integrate API
//Step 4: Display user's city, current temp, description, wind speed, and humidity

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

//CREATE SEARCH ENGINE
function getUserCity(event) {
  event.preventDefault();

  let userCity = document.querySelector("#city-search");
  let h1 = document.querySelector("h1");

  h1.innerHTML = `${userCity.value}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getUserCity);
