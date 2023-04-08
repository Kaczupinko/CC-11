const apikey = "TWÓJ_KLUCZ_API";
const fetchWeatherButton = document.getElementById("fetchWeather");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

function displayWeather(data) {
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const city = data.name;
    const country = data.sys.country;

    weatherInfo.innerHTML = `
        <h2>Pogoda dla ${city}, ${country}</h2>
        <p>Temperatura: ${temp} °C</p>
        <p>Opis: ${description}</p>
    `;
}

function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Nie udało się pobrać danych");
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            weatherInfo.innerHTML = `<p>${error.message}</p>`;
        });
}

fetchWeatherButton.addEventListener("click", () => {
    const city = cityInput.value;
    fetchWeatherData(city);
});