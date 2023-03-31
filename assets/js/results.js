var cityName = localStorage.getItem("cityName");
var weatherData = [];

console.log(cityName);


fetch("https://api.open-meteo.com/v1/forecast?latitude=-37.81&longitude=144.96&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,precipitation_hours,precipitation_probability_max&timeformat=unixtime&timezone=Australia%2FSydney")
    .then( function (response) {
        return response.json();
    })
    .then(function (data) {

        for (i = 0; i < 7; i++) {

            var dailyMax = data.daily.temperature_2m_max[i] + "\u00B0C";
            var dailyMin = data.daily.temperature_2m_min[i] + "\u00B0C";
            var dailyUVMax = data.daily.uv_index_max[i];
            var dailyChanceRain = data.daily.precipitation_probability_max[i] + "%";
            var dailyWeatherCode = data.daily.weathercode[i];

            var dailyWeatherIcon;

            if (dailyWeatherCode === 0) {
                dailyWeatherIcon = "01d";
            } else if (dailyWeatherCode === 1 || dailyWeatherCode === 2) {
                dailyWeatherIcon = "02d";
            } else if (dailyWeatherCode ===3) {
                dailyWeatherIcon = "03d"
            } else if (dailyWeatherCode === 45 || dailyWeatherCode === 48) {
                dailyWeatherIcon = "50d"
            } else if (dailyWeatherCode === 51 || dailyWeatherCode === 53 || dailyWeatherCode === 55 || dailyWeatherCode === 80 || dailyWeatherCode === 81 || dailyWeatherCode === 82) {
                dailyWeatherIcon = "09d";
            } else if (dailyWeatherCode === 61 || dailyWeatherCode === 63 || dailyWeatherCode === 65 || dailyWeatherCode === 66 || dailyWeatherCode ===67) {
                dailyWeatherIcon = "10d";
            } else if (dailyWeatherCode === 71 || dailyWeatherCode === 73 || dailyWeatherCode === 75 || dailyWeatherCode === 77 || dailyWeatherCode === 85 || dailyWeatherCode === 86) {
                dailyWeatherIcon = "13d";
            } else if (dailyWeatherCode === 95 || dailyWeatherCode === 96 || dailyWeatherCode === 99) {
                dailyWeatherIcon = "11d";
            }

            var dailyWeatherData = {
                maxTemp: dailyMax,
                minTemp: dailyMin,
                UV: dailyUVMax,
                rain: dailyChanceRain,
                weatherIcon: dailyWeatherIcon
            }

            weatherData.push(dailyWeatherData);
            
        }
        displayWeather(weatherData);
    })


var weatherDiv = document.querySelector("#weather-results")
var todayWeatherDiv = document.querySelector("#today");
var futureWeatherDiv = document.querySelector(".future-weather");


function displayWeather (weatherData) {

    var todayEl = document.createElement("h5");
    var todayTempEl = document.createElement("p");
    var todayIconEl = document.createElement("img");
    var todayUVEl = document.createElement("p");
    var todayRainEl = document.createElement("p");
    
    todayIconEl.setAttribute("class", "weather-icon");

    todayEl.textContent = "Today";
    todayTempEl.textContent = "Max: " + weatherData[0].maxTemp;
    todayIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherData[0].weatherIcon + "@2x.png")
    todayUVEl.textContent = "UV: " + weatherData[0].UV;
    todayRainEl.textContent = "Rain: " + weatherData[0].rain;

    todayWeatherDiv.appendChild(todayEl);
    todayWeatherDiv.appendChild(todayTempEl);
    todayWeatherDiv.appendChild(todayIconEl);
    todayWeatherDiv.appendChild(todayUVEl);
    todayWeatherDiv.appendChild(todayRainEl);

    weatherDiv.appendChild(todayWeatherDiv);

    for (i = 1; i < 7; i++) {
        var divEl = document.createElement("div");
        var dayEl = document.createElement("h5");
        var tempEl = document.createElement("p");
        var iconEl = document.createElement("img");
        var uvEl = document.createElement("p");
        var rainEl = document.createElement("p");

        iconEl.setAttribute("class", "weather-icon");

        dayEl.textContent = dayjs().add(i, 'day').format("ddd");
        tempEl.textContent = "Max: " + weatherData[i].maxTemp;
        iconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherData[i].weatherIcon + "@2x.png")
        uvEl.textContent = "UV: " + weatherData[i].UV;
        rainEl.textContent = "Rain: " + weatherData[i].rain;

        divEl.appendChild(dayEl);
        divEl.appendChild(tempEl);
        divEl.appendChild(iconEl);
        divEl.appendChild(uvEl);
        divEl.appendChild(rainEl);

        futureWeatherDiv.appendChild(divEl);
        weatherDiv.appendChild(futureWeatherDiv);


    }
    


    


}
