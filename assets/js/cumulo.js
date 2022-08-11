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

/* -------------------------------------------------------------------------- */
/*                             formatting functions                           */
/* -------------------------------------------------------------------------- */

function formatCityBtnsTxt(text) {
    const lowerCaseCityTitle = text.toLowerCase();
    const formattedCityTitle = lowerCaseCityTitle
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(' ');
    return formattedCityTitle;
}

/* -------------------------------------------------------------------------- */
/*                      get weather conditions functions                      */
/* -------------------------------------------------------------------------- */

const apiKey = 'c68837c426737828b05c49ecb97695bd';

// Style the current weather card to reflect the current data
function styleTodaysWeather(icon, temp, wind, humidity, uvIndex) {
    currentWeatherIcon.attr('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);
    // convert kelvin to rounded celsius
    const celsiusTemp = Math.round(temp - 273.15);
    currentTempText.text(celsiusTemp);

    currentWindText.text(wind);

    currentHumidityText.text(humidity);

    // Style the uv label depending on the severity of the uv index
    if (uvIndex < 3) {
        currentUVLabel.addClass('uv-index-low');
        currentUVLabel.removeClass('uv-index-moderate');
        currentUVLabel.removeClass('uv-index-high');
    } else if (uvIndex >= 3 && uvIndex < 6) {
        currentUVLabel.addClass('uv-index-moderate');
        currentUVLabel.removeClass('uv-index-low');
        currentUVLabel.removeClass('uv-index-high');
    } else {
        currentUVLabel.addClass('uv-index-high');
        currentUVLabel.removeClass('uv-index-low');
        currentUVLabel.removeClass('uv-index-moderate');
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
        futureWeatherIconText.attr('src', `https://openweathermap.org/img/wn/${futureWeatherIcon}.png`);

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
    styleTodaysWeather(
        currentWeatherData.current.weather[0].icon,
        currentWeatherData.current.temp,
        currentWeatherData.current.wind_speed,
        currentWeatherData.current.humidity,
        currentWeatherData.current.uvi
    );
    styleFutureWeather(currentWeatherData.daily);
}

/* -------------------------------------------------------------------------- */
/*                        get current location weather                        */
/* -------------------------------------------------------------------------- */

// Get the city name for the current location
async function getCurrentLoc(latitude, longitude) {
    let currentCity = '';
    const weatherApiUrlLoc = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
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

/* -------------------------------------------------------------------------- */
/*         save search data to the local storage and display as a list        */
/* -------------------------------------------------------------------------- */

/* --------------------- delete city from local storage --------------------- */

function deleteCityFromSearch(e) {
    // get the city name from the search results
    const unformattedCityTitle = e.currentTarget.previousElementSibling.innerText;
    // format the city name
    const formattedCityTitle = formatCityBtnsTxt(unformattedCityTitle);
    // Get the saved city search data
    const citySearchData = JSON.parse(localStorage.getItem('citySearches'));
    // Get the index of the city data that you wish to delete
    const indexOfCity = citySearchData.findIndex((element) => element.city_name === formattedCityTitle);
    // Splice it out of the array
    citySearchData.splice(indexOfCity, 1);
    // Mutate the data in local storage
    localStorage.setItem('citySearches', JSON.stringify(citySearchData));

    // Remove the city search list item from the search history list
    e.currentTarget.parentElement.remove();
}

/* -------------------- Append the city to the list item -------------------- */
function appendCityListItem(city) {
    const cityHTML = `
    <li class="collection-item">
        <button
            type="button"
            class="search-city-specific-btn waves-effect waves-light btn-small"
        >
            ${city}
        </button>
        <button type="button" class="delete-city-btn waves-effect waves-light btn"><i class="material-icons delete-icon">delete_outline</i></button>
    </li>
    `;
    searchHistoryList.append(cityHTML);
}

/* ------ Save city to the local storage, append to search history list ----- */

function saveCitySearch(city) {
    // get the city search history
    const citySearchData = JSON.parse(localStorage.getItem('citySearches')) || [];
    // get the length of the array
    const { length } = citySearchData;
    // increment the id value in the object to be added
    const id = length + 1;
    // check if there's a city with the same name in the local storage
    const found = citySearchData.some((el) => el.city_name === city);
    // Add the city to the array if it's not found
    if (!found) {
        citySearchData.push({ id, city_name: city });
        // Append the city to the search history list
        appendCityListItem(city);

        // get the last delete btn added
        const deleteBtns = $('.delete-city-btn');
        const lastDeleteBtn = deleteBtns.last();
        // get the last search btn added
        const searchBtns = $('.search-city-specific-btn');
        const lastSearchBtn = searchBtns.last();
        // Run the event listener functions
        lastDeleteBtn.on('click', deleteCityFromSearch);
        lastSearchBtn.on('click', searchSpecificCity);
    }

    // Add the city to the local storage if it's not found
    localStorage.setItem('citySearches', JSON.stringify(citySearchData));
}

/* ------------------- get and display city search history ------------------ */

function getCitySearches() {
    // get the city search data or an empty array
    const citySearchData = JSON.parse(localStorage.getItem('citySearches')) || [];
    // append to the list if it's not an empty array
    if (citySearchData !== []) {
        citySearchData.forEach((el) => {
            appendCityListItem(el.city_name);
        });
        // select city delete btns
        const deleteCityBtns = $('.delete-city-btn');
        // select city search btns
        const searchCityBtns = $('.search-city-specific-btn');
        deleteCityBtns.on('click', deleteCityFromSearch);
        searchCityBtns.on('click', searchSpecificCity);
    }
}

getCitySearches();

/* -------------------------------------------------------------------------- */
/*                            search functionality                            */
/* -------------------------------------------------------------------------- */

/* ----------------------- search for a specific city ----------------------- */

// Geocoding API to get coordinates and
async function getCityLatLong(cityName) {
    const geocodingAPIUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit5=1&appid=${apiKey}`;
    const LatLongResponse = await fetch(geocodingAPIUrl);
    const LatLongData = await LatLongResponse.json();
    // Create an abject to store the processed data
    const searchResults = {
        lat: LatLongData[0].lat,
        long: LatLongData[0].lon,
        name: LatLongData[0].name,
    };
    // style todays weather card city name
    currentCityText.text(searchResults.name);
    // style all the weather cards
    getWeather(searchResults.lat, searchResults.long);
    // add the searched city to the search history
    saveCitySearch(cityName);
}

function handleCitySearch(e) {
    e.preventDefault();
    if (cityInput.val() !== '') {
        const cityToSearch = cityInput.val();
        getCityLatLong(cityToSearch);
    }
}

searchCityForm.on('submit', handleCitySearch);

/* ------------- search specific cities using the search history ------------ */

function searchSpecificCity(e) {
    const formattedCityName = formatCityBtnsTxt(e.currentTarget.innerText);
    getCityLatLong(formattedCityName);
}
