/////////////////////////////////////////////////
/////////////////////////////////////////////////
//
// MVP1 : Basic Function
//
// Ticket 1: Create Placeholder Functions
//
//
//
//
//
//
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Ticket 2: Defining variables as DOM elements

const leftPanel = document.getElementById("left");
const button = document.getElementById("getWeatherBtn");
const locationInput = document.getElementById("location");

// Ticket 1a: Creating function1, 'getWeatherData()', the function that calls the api

async function getWeatherData() {
    // Need to assign a variable to the fetch(request)

    // Then return that variable. For placeholder purposes we are returning a hard-coded object.
    // return { weathercode: 50, tempHigh: 30, };

    userLoc = await getLocation();
    console.log(`Incoming Coords: ${userLoc}`);

    const weatherFetch = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${userLoc[0]}&longitude=${userLoc[1]}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=GMT&forecast_days=1`,
        {
            headers: {
                Accept: "application/json",
            },
        }
    );

    const data = await weatherFetch.json();
    console.log(data);
    return data;
}

// Ticket 1b: Creating function2, 'displayWeatherData', the function that calls getWeatherData and then alert()'s data within the object.
// Ticket 2: Getting function to add values to the DOM

async function displayWeatherData() {
    // Assigning the fetched data OBJECT/PROMISE to the variable weatherData

    const weatherData = await getWeatherData();
    console.log(weatherData);

    // Declaring results from our API Call that we can use in our appended text later.
    const weatherCodeResult = weatherData.daily.weathercode;
    const tempHighResult = weatherData.daily.temperature_2m_max;
    const tempLowResult = weatherData.daily.temperature_2m_min;
    // We get the max temp of the day and the min temp of the day, then find the average to determine today's temp
    const tempAverage = Math.floor(
        (Number(tempLowResult) + Number(tempHighResult)) / 2
    );

    // Creating the HTML elements through the DOM, making a p tag then adding our desired strings into that, then appending them to the parent node
    leftPanel.innerHTML = null;
    const weatherCodeContainer = document.createElement(`img`);
    // Checking weatherCodeResult against the supplied table of results to determine which image to use
    if (weatherCodeResult == 0) {
        weatherCodeContainer.src = "./images/clear.webp";
    } else if (weatherData.daily.weathercode < 45) {
        weatherCodeContainer.src = "./images/cloudy.webp";
    } else if (weatherData.daily.weathercode < 51) {
        weatherCodeContainer.src = "./images/fog.webp";
    } else if (weatherData.daily.weathercode < 61) {
        weatherCodeContainer.src = "./images/drizzle.png";
    } else if (weatherData.daily.weathercode < 71) {
        weatherCodeContainer.src = "./images/lightrain.png";
    } else if (weatherData.daily.weathercode < 80) {
        weatherCodeContainer.src = "./images/snow.webp";
    } else if (weatherData.daily.weathercode < 95) {
        weatherCodeContainer.src = "./images/heavyrain.png";
    } else if (weatherData.daily.weathercode < 100) {
        weatherCodeContainer.src = "./images/lightning.webp";
    } else {
        weatherCodeContainer.src = "./images/clear.webp";
    }
    leftPanel.appendChild(weatherCodeContainer);

    const tempHighContainer = document.createElement(`p`);
    tempHighContainer.textContent = `Today: ${tempAverage}${weatherData.daily_units.temperature_2m_max}`;
    leftPanel.appendChild(tempHighContainer);
}

async function getLocation() {
    let userLocation = locationInput.value;
    let sanitisedLocation = userLocation.replace(/ /gi, "+");
    let coords = await fetch(
        `https://geocode.maps.co/search?q=${sanitisedLocation}`,
        {
            headers: {
                Accept: "application/json",
            },
        }
    );

    data = await coords.json();
    let userLat = parseFloat(data[0].lat).toFixed(2);
    let userLon = parseFloat(data[0].lon).toFixed(2);
    let userLoc = [];
    userLoc.push(userLat);
    userLoc.push(userLon);

    return userLoc;
}

// Create Event listener for button click to get date from weather api

button.addEventListener("click", displayWeatherData);
