function formatDate1(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let now = new Date(timestamp);

  let minutes = now.getMinutes();
  let hours = now.getHours();
  let date = now.getDate();
  let day = now.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let dayName = days[day];

  let dateString = dayName + " " + hours + ":" + minutes;

  let currentDate = document.querySelector("#current-date");
  currentDate.textContent = dateString;
}

formatDate(new Date());

function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#find-city");
  searchCity(searchInput.value);
}

function searchCity(city) {
  let apiKey = "4b56c390c93204ac6691cef5e9c7a14d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("form");
form.addEventListener("submit", changeCity);

function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "4b56c390c93204ac6691cef5e9c7a14d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(showPosition);

function showTemperature(response) {
  console.log(response.data.weather[0].description);
  let cityElement = document.querySelector(".city");
  let currentHumidity = Math.round(response.data.main.humidity);
  let humidElement = document.querySelector(".humidity");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".temperature-today");
  let message = `${temperature}°C`;
  let clouds = document.querySelector(".cloudstoday");
  humidElement.innerHTML = ` ${currentHumidity} %`;
  temperatureElement.innerHTML = message;
  cityElement.innerHTML = response.data.name;
  clouds.innerHTML = response.data.weather[0].description;
}
function findCity(response) {
  let cityResult = document.querySelector(".city");
  let cityFinder = document.querySelector("#search");
  cityFinder.addEventListener("submit", findCity);
  cityResult.innerHTML = response;
}
