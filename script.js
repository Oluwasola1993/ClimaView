// OpenWeatherMap API key (replace with your own)
const apiKey = "426a97b217b4faa96df05b51540b723b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// DOM elements
const searchBox = document.getElementById('inp');
const searchBtn = document.getElementById('search');
const err = document.getElementById('error');
const errNw = document.getElementById('errorNew');

// Function to fetch weather data
async function checkWeather(city) {
    // Check if input box is empty
    if (searchBox.value.trim() === "") {
        err.style.display = "block";
        document.querySelector('.weather').style.display = "none";
        // Hide error message after 4 seconds
        setTimeout(() => {
            err.style.display = "none";
        }, 4000);
        return;
    }

    // Fetch weather data from OpenWeatherMap API
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        // Check if city not found
        if (data.cod === "404") {
            errNw.style.display = "block";
            document.getElementById('result').style.display = "none";
            document.querySelector('.weather').style.display = "none";
            // Hide error message after 4 seconds
            setTimeout(() => {
                errNw.style.display = "none";
            }, 4000);
        } else {
            // Update weather information on success
            document.getElementById("city").textContent = data.name;
            document.getElementById("temp").textContent = Math.round(data.main.temp) + "℃";
            document.getElementById("hum").textContent = data.main.humidity + "%";
            document.getElementById("win").textContent = data.wind.speed + " km/h";
            document.getElementById("result").textContent = data.weather[0].main;

            // Display weather icon
            const iconCode = data.weather[0].icon;
            displayWeatherIcon(iconCode);

            // Show weather details
            document.getElementById('result').style.display = "block";
            document.querySelector('.weather').style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching weather data: ", error);
    }

    // Clear search box
    searchBox.value = "";
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Function to display weather icon
function displayWeatherIcon(iconCode) {
    const iconElement = document.getElementById('weatherIcon');
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    iconElement.src = iconUrl;
}
