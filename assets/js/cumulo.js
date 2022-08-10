/* -------------------------------------------------------------------------- */
/*                                  selectors                                 */
/* -------------------------------------------------------------------------- */

// Search for a city section
const searchCityForm = $('.search-city-form');
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
const currentUVLabel = $('.todays-uv-index-label');
const currentUVText = $('#currentUV');

// Future weather section
const futureForecastCards = document.querySelectorAll('.future-forecast-card');

// Modal trigger
document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.modal');
    const instances = M.Modal.init(elems, {
        opcaity: 0.5,
        inDuration: 500,
        outDuration: 250,
    });
});

/* ------------ get the weather conditions for the users location ----------- */

const apiKey = 'c68837c426737828b05c49ecb97695bd';

// Style the current weather card to reflect the current data
function styleTodaysWeather(icon, temp, wind, humidity, uvIndex) {
    currentWeatherIcon.attr('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);
    // convert kelvin to rounded celsius
    const celsiusTemp = Math.round(temp - 273.15);
    currentTempText.text(celsiusTemp);

    currentWindText.text(wind);

    currentHumidityText.text(humidity);

    // Style the uv label depending on the severity of the uv index
    if (uvIndex < 3) {
        currentUVLabel.addClass('uv-index-low');
    } else if (uvIndex >= 3 && uvIndex < 6) {
        currentUVLabel.addClass('uv-index-moderate');
    } else {
        currentUVLabel.addClass('uv-index-high');
    }
    currentUVText.text(uvIndex);
}

// Style the future weather cards
function styleFutureWeather(days) {
    // Sets the card counter to zero so it can be incremented
    let cardCount = 0;
    // Gets the current day as an integer
    const currentDayNum = dayjs().day();

    futureForecastCards.forEach((card) => {
        // get the correct card
        cardCount += 1;

        // styling the days of each card
        const cardDayText = $(`.day-${cardCount}-name`);
        // increments to the next day
        const cardDayNum = currentDayNum + cardCount;
        // format the next day
        const futureDay = dayjs().day(cardDayNum).format('dddd');
        // style the day text
        cardDayText.text(futureDay);

        // styling the icon of each card
        const futureWeatherIconText = $(`.weather-icon-day-${cardCount}`);
        // set the icon from the api data
        const futureWeatherIcon = days[cardCount].weather[0].icon;
        futureWeatherIconText.attr('src', `http://openweathermap.org/img/wn/${futureWeatherIcon}.png`);

        // styling the temp of each card
        const cardTempText = $(`.future-temp-${cardCount}`);
        // set and format the temperature from the api data
        cardTempText.text(`${Math.round(days[cardCount].temp.day - 273.15)}°C`);

        // styling the wind of each card
        const cardWindText = $(`.future-wind-${cardCount}`);
        // set and format the wind speed from the api data
        cardWindText.text(`${days[cardCount].wind_speed}MPH`);

        // styling the humidity of each card
        const cardHumidityText = $(`.future-humidity-${cardCount}`);
        // set the humidity of each card
        cardHumidityText.text(`${days[cardCount].humidity}%`);
    });
}

// Get the current weather for a given latitude and longitude
async function getWeather(latitude, longitude) {
    const weatherApiUrlCurr = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}`;
    const openWeatherCurrResp = await fetch(weatherApiUrlCurr);
    // get the current weather data for the users location
    const currentWeatherData = await openWeatherCurrResp.json();
    console.log(currentWeatherData);
    styleTodaysWeather(
        currentWeatherData.current.weather[0].icon,
        currentWeatherData.current.temp,
        currentWeatherData.current.wind_speed,
        currentWeatherData.current.humidity,
        currentWeatherData.current.uvi
    );
    console.log(currentWeatherData.daily);
    styleFutureWeather(currentWeatherData.daily);
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
            getCurrentLoc(lat, long);
            getWeather(lat, long);
        });
    } else {
        console.log("couldn't get users position");
    }
}

getLocation();

// Implement a search city function

/* ---------------------- search for your specific city --------------------- */

function handleCitySearch(e) {
    e.preventDefault();
    console.log(e);
}

console.log(searchCityForm);

searchCityForm.addEventListener('submit', handleCitySearch);

// Save search data to the local storage
