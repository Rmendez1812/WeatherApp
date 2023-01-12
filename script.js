// API Variables
var searchBtnEl = document.querySelector(".search-btn");
var containerEl = document.querySelector(".container");
var searchEl = document.querySelector(".search");

// containers display to none upon opening
containerEl.style.display = "none";

// event listener upon clicking search to display containers and fetch API's
searchBtnEl.addEventListener("click", function (event) {
  event.preventDefault();
  containerEl.style.display = "block";

  if (searchEl.value.trim() || searchEl.value.trim() !== "") {
    let city = searchEl.value.trim();

    saveCitySearch(city);
    weather(searchEl.value)
    searchEl.value = "";
  }
});

// WEATHER API FETCH FUNCTION
function weather(localWeather) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    localWeather +
    "&appid=6167587c391046375de6b18f1d876b8a&units=imperial"
  )

    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // weather api print to page
      document.querySelector(".temp").textContent = Math.round(data.main.temp);
      console.log(Math.round(data.main.temp));

      document.querySelector(".description").textContent = data.weather[0].description;
      console.log(data.weather[0].description);

      document.querySelector(".wind").textContent = (data.wind.speed);
      console.log(data.wind.speed);

      document.querySelector(".humidity").textContent = Math.round(data.main.humidity);
      console.log(Math.round(data.main.humidity));

      document.querySelector(".name").textcontent = (data.name);
      console.log(data.main.name);

      document.querySelector(".dt").textContent = (data.current.dt);
      console.log(data.current.dt);

      // can pull other icons from another source if you want
      var weatherIcon = data.weather[0].icon;
      var weatherIconUrl =
        "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
      document.querySelector(".icon").setAttribute("src", weatherIconUrl);
      console.log(weatherIconUrl);


    });
};

// Saving the past searches into local storage
function saveCitySearch(city) {
  let previousHistory = JSON.parse(localStorage.getItem("searchHistory")) || {};
  previousHistory[city] = true;
  localStorage.setItem("searchHistory", JSON.stringify(previousHistory));
};