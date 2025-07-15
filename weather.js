//Step 1: Get current date
//Step 2: Create search engine
//Step 3: Integrate API
//Step 4: Get user's city, current temp, description, wind speed, and humidity

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
