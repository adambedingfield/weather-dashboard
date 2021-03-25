var city = document.querySelector("#cityinput");
var currentWeatherEl = document.querySelector("#current-weather");

var convertCity = function() {
    var geoCodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city.value + "&limit=5&appid=eab2fd8e6f53d96f9a1409a1d512d8ce";
    fetch(geoCodeUrl)
    .then (function(response) {
        // request was successful
        if(response.ok) {
          response.json().then(function(data) {
            var cityLat = data[0].lat;
            var cityLon = data[0].lon;
            cityName = data[0].name;
            //console.log(cityName);
            var weatherInfoUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&exclude=minutely,hourly,alerts&appid=eab2fd8e6f53d96f9a1409a1d512d8ce";
            fetch(weatherInfoUrl)
            .then (function(weather) {
                  weather.json().then(function(weatherData) {
                    foreCast = weatherData;
                    currentIcon = weatherData.current.weather[0].icon;
                    displayIcon = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png"
                    console.log(weatherData);
                  });
            })
          });
        }
    })
    currentWeather();

};

var currentWeather = function() {
    var currentDateText = document.createElement("h1")
    var weatherIcon = document.createElement("img");
    weatherIcon.src = displayIcon;
    var today = new Date();
    var currentDate = "(" + (today.getMonth()+1)+'/'+ today.getDate() + '/' + today.getFullYear() + ")";
    currentDateText.textContent = cityName + " " + currentDate;
    currentDateText.append(weatherIcon);
    var temp = document.createElement("p");
    temp.textContent = "Temperature: " + foreCast.current.temp + " F";
    var humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + foreCast.current.humidity + "%";
    var windSpeed = document.createElement("p");
    windSpeed.textContent = "Wind Speed: " + foreCast.current.wind_speed + " MPH";
    var uvi = document.createElement("p");
    uvi.textContent = "UV Index: " + foreCast.current.uvi;
    currentWeatherEl.append(currentDateText, temp, humidity, windSpeed, uvi);
}
var searchCity = document.querySelector("#search");
searchCity.addEventListener("click", convertCity);