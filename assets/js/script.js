// global variables
var city = document.querySelector("#cityinput");
var searchedCity = document.querySelector("#savedcityinput");
var currentWeatherEl = document.querySelector("#current-weather");
var placeHolder = document.querySelector("#weather-placeholder");
var FiveDayCast = document.querySelector("#SmalldayForecast");
var searchEl = document.querySelector('#search-col');
var day2El = document.querySelector("#day2");
var day3El = document.querySelector("#day3");
var day4El = document.querySelector("#day4");
var day5El = document.querySelector("#day5");
var day6El = document.querySelector("#day6");
//save cities array
let searchHistory = JSON.parse(localStorage.getItem("history")) || [];

// function that takes a city name, then pulls its lat and lon to produce weather results
var convertCity = function() {
    searchHistory.push(city.value)
    var geoCodeUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city.value + "&limit=5&appid=2981de0eb91d23b84c577afb5ed8da9e";
    fetch(geoCodeUrl)
    .then (function(response) {
        // request was successful
        if(response.ok) {
            response.json().then(function(data) {
                var cityLat = data[0].lat;
                var cityLon = data[0].lon;
                cityName = data[0].name;
                var weatherInfoUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&exclude=minutely,hourly,alerts&appid=2981de0eb91d23b84c577afb5ed8da9e";
                fetch(weatherInfoUrl)
                .then (function(weather) {
                    weather.json().then(function(weatherData) {
                        foreCast = weatherData;
                        currentIcon = weatherData.current.weather[0].icon;
                        displayIcon = "https://openweathermap.org/img/wn/" + currentIcon + "@2x.png"
                        currentWeather();
                        fiveDayForecast();
                        localStorage.setItem("history",JSON.stringify(searchHistory));
                        location.reload();
                    });
                })
            });
        }
    })
    
};

//writes the weather data for the current day
var currentWeather = function() {
    currentWeatherEl.innerHTML = '';
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
    uvi.classList.add("row");
    var uviColor = document.createElement("p")
    var uviGet = foreCast.current.uvi;
    uviColor.textContent = uviGet;
    uvi.textContent = "UV Index: ";
    uvi.appendChild(uviColor);
    if (foreCast.current.uvi >= 11) {
        uviColor.classList.add("purple");
    } else if (foreCast.current.uvi >= 8) {
        uviColor.classList.add("red");
    } else if (foreCast.current.uvi >= 6) {
        uviColor.classList.add("orange");
    } else if (foreCast.current.uvi >= 3) {
        uviColor.classList.add("yellow");
    } else if (foreCast.current.uvi >= 0) {
        uviColor.classList.add("green");
    }
    
    currentWeatherEl.append(currentDateText, temp, humidity, windSpeed, uvi);
    placeHolder.classList.add("hide");
    currentWeatherEl.classList.remove("hide");
    FiveDayCast.classList.remove("hide");
    
}

// writes the weather for each day in the 5 day forecast
var fiveDayForecast = function() {
    var today = new Date();
    // day 2
    day2El.innerHTML = '';
    var day2Text = document.createElement("h4");
    var day2Date = "(" + (today.getMonth()+1)+'/'+ (today.getDate()+1) + '/' + today.getFullYear() + ")";
    day2Text.textContent = day2Date;
    var day2Icon = document.createElement("img");
    day2IconGet = foreCast.daily[1].weather[0].icon;
    day2Icon.src = "https://openweathermap.org/img/wn/" + day2IconGet + "@2x.png"
    var day2Temp = document.createElement("p");
    day2Temp.textContent = "Temp: " + foreCast.daily[1].temp.day + " F";
    var day2Humidity = document.createElement("p");
    day2Humidity.textContent = "Humidity: " + foreCast.daily[1].humidity + "%";
    day2El.append(day2Text, day2Icon, day2Temp, day2Humidity);
    // day 3
    day3El.innerHTML = '';
    var day3Text = document.createElement("h4");
    var day3Date = "(" + (today.getMonth()+1)+'/'+ (today.getDate()+2) + '/' + today.getFullYear() + ")";
    day3Text.textContent = day3Date;
    var day3Icon = document.createElement("img");
    day3IconGet = foreCast.daily[2].weather[0].icon;
    day3Icon.src = "https://openweathermap.org/img/wn/" + day3IconGet + "@2x.png"
    var day3Temp = document.createElement("p");
    day3Temp.textContent = "Temp: " + foreCast.daily[2].temp.day + " F";
    var day3Humidity = document.createElement("p");
    day3Humidity.textContent = "Humidity: " + foreCast.daily[2].humidity + "%";
    day3El.append(day3Text, day3Icon, day3Temp, day3Humidity);
    // day 4
    day4El.innerHTML = '';
    var day4Text = document.createElement("h4");
    var day4Date = "(" + (today.getMonth()+1)+'/'+ (today.getDate()+3) + '/' + today.getFullYear() + ")";
    day4Text.textContent = day4Date;
    var day4Icon = document.createElement("img");
    day4IconGet = foreCast.daily[3].weather[0].icon;
    day4Icon.src = "https://openweathermap.org/img/wn/" + day4IconGet + "@2x.png"
    var day4Temp = document.createElement("p");
    day4Temp.textContent = "Temp: " + foreCast.daily[3].temp.day + " F";
    var day4Humidity = document.createElement("p");
    day4Humidity.textContent = "Humidity: " + foreCast.daily[3].humidity + "%";
    day4El.append(day4Text, day4Icon, day4Temp, day4Humidity);
    // day 5
    day5El.innerHTML = '';
    var day5Text = document.createElement("h4");
    var day5Date = "(" + (today.getMonth()+1)+'/'+ (today.getDate()+4) + '/' + today.getFullYear() + ")";
    day5Text.textContent = day5Date;
    var day5Icon = document.createElement("img");
    day5IconGet = foreCast.daily[4].weather[0].icon;
    day5Icon.src = "https://openweathermap.org/img/wn/" + day5IconGet + "@2x.png"
    var day5Temp = document.createElement("p");
    day5Temp.textContent = "Temp: " + foreCast.daily[4].temp.day + " F";
    var day5Humidity = document.createElement("p");
    day5Humidity.textContent = "Humidity: " + foreCast.daily[4].humidity + "%";
    day5El.append(day5Text, day5Icon, day5Temp, day5Humidity);
    // day 6
    day6El.innerHTML = '';
    var day6Text = document.createElement("h4");
    var day6Date = "(" + (today.getMonth()+1)+'/'+ (today.getDate()+5) + '/' + today.getFullYear() + ")";
    day6Text.textContent = day6Date;
    var day6Icon = document.createElement("img");
    day6IconGet = foreCast.daily[5].weather[0].icon;
    day6Icon.src = "https://openweathermap.org/img/wn/" + day6IconGet + "@2x.png"
    var day6Temp = document.createElement("p");
    day6Temp.textContent = "Temp: " + foreCast.daily[5].temp.day + " F";
    var day6Humidity = document.createElement("p");
    day6Humidity.textContent = "Humidity: " + foreCast.daily[5].humidity + "%";
    day6El.append(day6Text, day6Icon, day6Temp, day6Humidity);
}

// loops through saved array then display the cities searched and creates DOM elements
var saveSearch = function() {
    for (let i=0; i<searchHistory.length; i++) {
        citySave = document.createElement("button");
        citySave.classList.add("city-holder");
        citySave.innerHTML = searchHistory[i];
        searchEl.append(citySave);
        var buttonCity = function() {
            city.value = searchHistory[i];
            savedCitySearch();
        }
        citySave.addEventListener("click", buttonCity);
    }
}

// pulls value from the saved cities then produces the weather for them
var savedCitySearch = function() {
    var geoCodeUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city.value + "&limit=5&appid=2981de0eb91d23b84c577afb5ed8da9e";
    fetch(geoCodeUrl)
    .then (function(response) {
        // request was successful
        if(response.ok) {
            response.json().then(function(data) {
                var cityLat = data[0].lat;
                var cityLon = data[0].lon;
                cityName = data[0].name;
                var weatherInfoUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&exclude=minutely,hourly,alerts&appid=2981de0eb91d23b84c577afb5ed8da9e";
                fetch(weatherInfoUrl)
                .then (function(weather) {
                    weather.json().then(function(weatherData) {
                        foreCast = weatherData;
                        currentIcon = weatherData.current.weather[0].icon;
                        displayIcon = "https://openweathermap.org/img/wn/" + currentIcon + "@2x.png"
                        currentWeather();
                        fiveDayForecast();
                    });
                })
            });
        } 
    })
    
};
// loads the last city the user input
var loadLast = function() {
    city.value = searchHistory.slice(-1);
    savedCitySearch();
}
saveSearch();
loadLast();

// clears the users local storage and city search
var clearButton = document.querySelector("#clear")
var clearData = function() {
    localStorage.clear();
    location.reload();
}
clearButton.addEventListener("click", clearData);

// searches the user input on button click
var searchCity = document.querySelector("#search");
searchCity.addEventListener("click", convertCity);