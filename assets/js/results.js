var cityName = localStorage.getItem("cityName");
var citySpan = document.querySelectorAll(".city-name");
var weatherDiv = document.querySelector("#weather-results")
var todayWeatherDiv = document.querySelector("#today");
var futureWeatherDiv = document.querySelector(".future-weather");
var trailsDiv = document.querySelector(".trail-data");

var trailList = JSON.parse(localStorage.getItem("trailList")) || [];
var trailsResponse = [];
var weatherData = [];
var lat;
var lon;

//making the first letter of the seached city capital
var firstLetter = cityName.charAt(0);
var firstLetterCap = firstLetter.toUpperCase();
var remainingLetters = cityName.slice(1);
var capitalWord = firstLetterCap + remainingLetters;

//appending the city name to the document in the relevant places
for(i = 0; i < 3; i++) {
    citySpan[i].textContent = capitalWord;
}
getTrailInfo();



function getTrailInfo () {
    trailList = [];

    trailsResponse = [
        trail = {
            "myTrails": {
                "trail": {
                    "name": {
                        "__cdata": "Sample Trail1"
                    },
                    "description": {
                        "__cdata": "Sample Description1"
                    },
                    "owner": {
                        "__cdata": "SampleUser"
                    },
                    "lat": -37.740822,
                    "lon": 145.136719,
                    "externalLink": {
                        "__cdata": "https://mytrails.com.au/1000000"
                    },
                    "filePath": "/trails/1000000/1000000000.xml",
                    "distanceKms": 31.75,
                    "terrain": "Off Road",
                    "mode": "Mountain Bike",
                    "views": 140
                },
                "marker": {
                    "name": {
                        "__cdata": "Sample Marker"
                    },
                    "description": {
                        "__cdata": "Sample Description"
                    },
                    "owner": {
                        "__cdata": "SampleUser"
                    },
                    "lat": -37.796441,
                    "lon": 145.000262,
                    "externalLink": {
                        "__cdata": "https://mytrails.com.au/search-location/37.79,145.00"
                    }
                }
            }
        },
        trail = {
            "myTrails": {
                "trail": {
                    "name": {
                        "__cdata": "Sample Trail2"
                    },
                    "description": {
                        "__cdata": "Sample Description2"
                    },
                    "owner": {
                        "__cdata": "SampleUser"
                    },
                    "lat": -37.740822,
                    "lon": 145.136719,
                    "externalLink": {
                        "__cdata": "https://mytrails.com.au/1000000"
                    },
                    "filePath": "/trails/1000000/1000000000.xml",
                    "distanceKms": 31.75,
                    "terrain": "Off Road",
                    "mode": "Mountain Bike",
                    "views": 140
                },
                "marker": {
                    "name": {
                        "__cdata": "Sample Marker"
                    },
                    "description": {
                        "__cdata": "Sample Description"
                    },
                    "owner": {
                        "__cdata": "SampleUser"
                    },
                    "lat": -37.796441,
                    "lon": 145.000262,
                    "externalLink": {
                        "__cdata": "https://mytrails.com.au/search-location/37.79,145.00"
                    }
                }
            }
        }
    ]

    lat = trail.myTrails.trail.lat;
    lon = trail.myTrails.trail.lon;

    

    for (i = 0; i < trailsResponse.length; i++) {
        var trailName = trailsResponse[i].myTrails.trail.name.__cdata;
        var distance = trailsResponse[i].myTrails.trail.distanceKms;
        var trailDescription = trailsResponse[i].myTrails.trail.description.__cdata;
        var trailTerrain = trailsResponse[i].myTrails.trail.terrain;
        var trailMode = trailsResponse[i].myTrails.trail.mode;

        var trailInfo = {
            name: trailName,
            distance: distance,
            description: trailDescription,
            terrain: trailTerrain,
            mode: trailMode,
            trailNumber: i + 1
        }

        trailList.push(trailInfo);
        localStorage.setItem("trailList", JSON.stringify(trailList));

    }
    displayTrails()
}

function displayTrails() {
    for (i = 0; i < trailsResponse.length; i++) {
        var divCol = document.createElement("div");
        divCol.setAttribute("class", "col s12 m6 l3");
        var card = document.createElement("div");
        card.setAttribute("class", "card");
        var cardImg = document.createElement("div");
        cardImg.setAttribute("class", "card-image");

        var trailImg = document.createElement("img");
        trailImg.setAttribute("src", "./assets/images/Screenshot 2023-03-30 at 12.42.35.png");
        cardImg.appendChild(trailImg);
        card.appendChild(cardImg);

        var cardTitle = document.createElement("span");
        cardTitle.setAttribute("class", "card-title");
        cardTitle.textContent = trailList[i].name;
        cardImg.appendChild(cardTitle);
        card.appendChild(cardImg);

        var cardContent = document.createElement("div");
        cardContent.setAttribute("class", "card-content");
        var trailDistance = document.createElement("p");
        trailDistance.textContent = trailList[i].distance + "km";
        cardContent.appendChild(trailDistance);
        card.appendChild(cardContent);

        var cardAction = document.createElement("div");
        cardAction.setAttribute("class", "card-action");
        var info = document.createElement("a");
        // info.setAttribute("href", "./details.html");
        info.setAttribute("data-trail", trailList[i].trailNumber);
        info.setAttribute("class", "info-button");
        // info.setAttribute("id", trailList[i].trailNumber);
        info.textContent = "See more info";
        cardAction.appendChild(info);
        card.appendChild(cardAction);


        divCol.appendChild(card);
        trailsDiv.appendChild(divCol);
    }
}

var button = document.querySelectorAll(".info-button");
for (j = 0; j <=0; j++) {
    // button[j] = document.getElementById("#j+1");
    button[0].addEventListener("click", function () {
        var element = event.target;
        
        var trailNum = trailList[j-1].trailNumber;;
        trailList.push(trailNum);
        console.log(trailList);
    })
}

fetch("https://api.open-meteo.com/v1/forecast?latitude="+ lat + "&longitude=" + lon + "&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,precipitation_hours,precipitation_probability_max&timeformat=unixtime&timezone=Australia%2FSydney")
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


function displayWeather (weatherData) {

    var todayEl = document.createElement("h5");
    var todayTempEl = document.createElement("p");
    var todayIconEl = document.createElement("img");
    var todayUVEl = document.createElement("p");
    var todayRainEl = document.createElement("p");
    
    todayIconEl.setAttribute("class", "weather-icon");

    todayEl.textContent = "Today";
    todayTempEl.textContent = "Max: " + weatherData[0].maxTemp;
    todayIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherData[0].weatherIcon + "@2x.png");
    todayIconEl.setAttribute("alt", "weather icon");
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

        divEl.setAttribute("class", "weather-card")
        iconEl.setAttribute("class", "weather-icon");

        dayEl.textContent = dayjs().add(i, 'day').format("ddd");
        tempEl.textContent = "Max: " + weatherData[i].maxTemp;
        iconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherData[i].weatherIcon + "@2x.png");
        iconEl.setAttribute("alt", "weather icon");
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
