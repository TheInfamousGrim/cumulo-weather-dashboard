# Cumulo Weather Dashboard 🌡️☁️

A weather dashboard to show the weather in your location as well as one that is searched

## Table of Contents 📃

1. [Description](#description)
2. [Screenshot](#screenshot)
3. [Usage](#usage)
4. [Technology](#technology)
5. [Features](#features)
6. [Badges](#badges)
7. [Credits](#credits)
8. [License](#license)
9. [Feedback](#feedback)

## Description

An application which can dynamically show the weather of the users current location (if they accept to share their information).

The user can search for any city in the world in order to view what the current and future weather conditions are.

Any city that the user searches is saved to the local storage and presented in a list where the user can:

- Press a button to search for the city weather conditions again
- Or delete the city search data from the list and local storage

When the weather from the desired location is looked up a card showing todays weather displays:

- The city name
- An icon showing the general weather conditions
- The current temperature
- The current wind speed
- The current humidity
- The current UV index

Below that the user is presented with a five day forecast, with each forecast card showing:

- The day of the forecast
- A weather icon showing the general weather conditions of the day
- The wind speed of that day
- The humidity of that day

### User Story 👤

AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

### What did I Learn 🏫

I've already been introduced to jQuery and Day.js and they came in handy here. Although I'm not a huge fan of jQuery as it seems that you can traverse the DOM with ease using JavaScript, it's still used by so many sites that I'm going to keep practicing with it till I'm more comfortable using it.

I again furthered my knowledge of getting data from API's and manipulating the data so that I can dynamically present end data to the user, specifically becoming more comfortable with async functions.

I decided to start learning another framework as well, which was [Materialize](https://materializecss.com/). Definitely prefer using bootstrap, did not find it as intuitive. But if the need to use another framework in my working life ever pops up then I'm in the money.

Other things I learned:

- how to manipulate elements using jQuery, whether that's selecting, appending or removing etc.
- Override framework stylings to either fix things or add my own stylings
- Manipulate data from a third party API

## Screenshot

![The weather dashboard application, with weather cards, a search form and a search history](/assets/readme-imgs/screenshot-cumulo-weather-dashboard.png)

## Usage

[![Website Status](https://img.shields.io/website-up-down-green-red/http/monip.org.svg)](https://theinfamousgrim.github.io/cumulo-weather-dashboard/)

If you would like to use this application please follow [this link](https://theinfamousgrim.github.io/cumulo-weather-dashboard/).

If you would like to develop this application further, feel free to fork the project or pull it for yourself.

## Technology

The technology used for the development of this app was:

- [github pages](https://pages.github.com/)
- [![HTML5](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)](https://html.com/)
- ![CSS3](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
- [Materialize](https://materializecss.com/)
- [![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://www.javascript.com/)
- [![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white)](https://jquery.com)
- [day.js](https://day.js.org/en/)

## Features

- search for the weather in any major city in the world
- show the weather in your current location
- show a five days of forecasts
- save your searched cities to the local storage and the search history card

## Badges

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

## Credits

🙏 Made with the help of:

- [University of Birmingham Coding Bootcamp](https://www.birmingham.ac.uk/postgraduate/courses/cpd/coding-boot-camp.aspx)
- [Materialize](https://materializecss.com/)
- [jQuery](https://jquery.com/)
- [day.js](https://day.js.org/en/)
- [w3schools](https://www.w3schools.com/howto/howto_css_loader.asp)
- [Favicon.io](https://favicon.io/)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[MIT License](/LICENSE.md)

## Feedback

![Ask Me Anything](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)

Any feedback please email [George Fincher](mailto:finchergeorge1@gmail.com)
