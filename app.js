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
