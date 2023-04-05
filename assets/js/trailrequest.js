// replace with the desired city name as Variable when ready
var cityname = localStorage.getItem("cityname"); 
const API_KEY = "70c3ec3c05e94d6f9c086c8a16d8a940";
var storedCoordinates = JSON.parse(localStorage.getItem("storedCoordinates")) || []
// let lat, lon; // declare variables to store latitude and longitude

// Make a GET call to the geocode API
fetch(`https://api.opencagedata.com/geocode/v1/json?q=${cityname}&key=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    console.log("data");
    console.log(data.results[0]);
    // Get the latitude and longitude of the city from the API response
    lat = data.results[0].geometry.lat;
    lon = data.results[0].geometry.lng;

    var coordinates = {
      lat: lat,
      lon: lon
    }

    storedCoordinates.push(coordinates);
    localStorage.setItem("storedCoordinates", JSON.stringify(storedCoordinates));


    console.log(`Latitude: ${lat}, Longitude: ${lon}`);

    // load Outdooractive Javascript API
    var oa_api = document.createElement('script');
    oa_api.type = 'text/javascript';
    oa_api.src = 'https://api-oa.com/jscr/oa_head.js?proj=api-dev-oa&amp;key=yourtest-outdoora-ctiveapi&amp;lang=en';
    document.head.appendChild(oa_api);

    // create configuration object for FlexView API
    var conf = {
      frontendtype:   "tour",          // choose content type
      zoom:           11,              // set initial zoom level
      center:         [lon, lat]       // set initial map center
    };

    // initialize FlexView API
        var fvp = oa.api.flexviewpage(conf);

  })
  .catch(error => console.error(error));





