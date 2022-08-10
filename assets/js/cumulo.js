/* -------------------------------------------------------------------------- */
/*                                  selectors                                 */
/* -------------------------------------------------------------------------- */

// Search for a city section
const cityInput = $('.validate');
const searchBtn = $('.search-city-btn');

// City search history section
const searchHistoryList = $('.collection');

// Todays weather section
const currentCityText = $('#currentCity');
const currentTimeText = $('#currentTime');
const currentWeatherIcon = $('.weather-icon-current');
const currentTempText = $('#currentTemp');
const currentWindText = $('#currentWind');
const currentHumidityText = $('#currentHumidity');
const currentUVText = $('#currentUV');

// Future weather section
const forecastContainers = document.querySelectorAll('.future-forecast-container');

// Modal trigger
document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.modal');
    const instances = M.Modal.init(elems, {
        opcaity: 0.5,
        inDuration: 500,
        outDuration: 250,
    });
});

/* -------------------------------- Api call -------------------------------- */

const apiKey = 'c68837c426737828b05c49ecb97695bd';

// Style the current weather card to reflect the current data
function styleTodaysWeather(icon, temp, wind, humidity, uvIndex) {
    currentWeatherIcon.attr('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);
    // convert kelvin to floored celsius
    const celsiusTemp = Math.round(temp - 273.15);
    currentTempText.text(celsiusTemp);
    currentWindText.text(wind);
    currentHumidityText.text(humidity);
    currentUVText.text(uvIndex);
}

// Get the current weather for a given latitude and longitude
async function getCurrentWeather(latitude, longitude) {
    const weatherApiUrlCurr = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}`;
    const openWeatherCurrResp = await fetch(weatherApiUrlCurr);
    const currentWeatherData = await openWeatherCurrResp.json();
    console.log(currentWeatherData);
    console.log(currentWeatherData.current.weather[0].icon);
    styleTodaysWeather(
        currentWeatherData.current.weather[0].icon,
        currentWeatherData.current.temp,
        currentWeatherData.current.wind_speed,
        currentWeatherData.current.humidity,
        currentWeatherData.current.uvi
    );
}

// Get the city name for the current location
async function getCurrentLoc(latitude, longitude) {
    let currentCity = '';
    const weatherApiUrlLoc = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
    const openWeatherLocResp = await fetch(weatherApiUrlLoc);
    const currentCityData = await openWeatherLocResp.json();
    currentCity = currentCityData[0].name;
    currentCityText.text(currentCity);
}

// get current lat and long location
function getLocation() {
    if (navigator.geolocation) {
        const userLocation = navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            const userCity = getCurrentLoc(lat, long);
            const userWeatherObj = getCurrentWeather(lat, long);
        });
    } else {
        console.log('couldnt get users position');
    }
}

getLocation();

// async function getCurrentCity() {
//     const geoLocationUrl = await fetch('https://geolocation-db.com/json/ 50ad4a90-fd5e-11ec-b463-1717be8c9ff1');
//     const userLocation = await geoLocationUrl.json();
//     console.log(userLocation);
// }

// getCurrentCity();

const weather = {
    apiKey: 'c68837c426737828b05c49ecb97695bd',
    fetchWeather: () => {
        fetch(
            'https://api.openweather.org/data/2,5/weather?q=denver&units=metric&appid=c68837c426737828b05c49ecb97695bd'
        )
            .then((response) => response.json())
            .then((data) => console.log(data));
    },
};

// search for a city

// when I search for a city then I will produce todays weather and current time
