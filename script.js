// Get all necessary HTML element references first
const apiKey = "800ac96ee320b621be8051a9f8f70c1c"; // IMPORTANT: Use your own API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDisplay = document.querySelector(".weather");
const errorDisplay = document.querySelector(".error");
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

/**
 * Fetches and displays weather data for a given city.
 * @param {string} city - The name of the city to get weather for.
 */
async function checkWeather(city) {
    if (!city) {
        return; // Don't search if the input is empty
    }

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
        errorDisplay.classList.remove("hide");
        weatherDisplay.classList.add("hide");
        return;
    }

    const data = await response.json();
    console.log(data); // For debugging

    // Update text content
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Update weather icon
    const weatherCondition = data.weather[0].main;
    if (weatherCondition == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (weatherCondition == "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (weatherCondition == "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (weatherCondition == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (weatherCondition == "Mist" || weatherCondition == "Fog") {
        weatherIcon.src = "images/mist.png";
    } else if (weatherCondition == "Snow") {
        weatherIcon.src = "images/snow.png";
    } else {
        // Fallback icon if condition is something else
        weatherIcon.src = "images/clear.png"; 
    }

    // Show the weather display and hide any error message
    weatherDisplay.classList.remove("hide");
    errorDisplay.classList.add("hide");
}

// Event listener for the theme toggle
themeToggle.addEventListener('change', () => {
    body.classList.toggle('light-theme');
});

// Event listener for the search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Event listener for pressing "Enter"
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});