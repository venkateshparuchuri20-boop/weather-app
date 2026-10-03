const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");
const weatherDescription = document.getElementById("weatherDescription");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const feelsLike = document.getElementById("feelsLike");
const pressure = document.getElementById("pressure");
const hourlyContainer = document.getElementById("hourlyContainer");
const forecastContainer = document.getElementById("forecastContainer");
async function getWeather(city) {
    try {
        const url = `http://localhost:3000/weather?city=${city}`;
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.error || "Something went wrong"
            );
        }
        const data = await response.json();
        console.log(data);
        cityName.textContent = data.name;
        weatherDescription.textContent =
            data.weather[0].description;
        temperature.textContent =
            Math.round(data.main.temp);
        humidity.textContent =
            `${data.main.humidity}%`;
        windSpeed.textContent =
            `${data.wind.speed} m/s`;
        feelsLike.textContent =
            `${Math.round(data.main.feels_like)}°C`;
        pressure.textContent =
            `${data.main.pressure} hPa`;
    }
    catch (error) {
        alert(error.message);
    }
}
async function getForecast(city) {
    try {
        const url =
            `http://localhost:3000/forecast?city=${city}`;
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.error || "Could not get forecast"
            );
        }
        const data = await response.json();
        console.log(data);
        hourlyContainer.innerHTML = "";
        forecastContainer.innerHTML = "";
        data.list.slice(0, 5).forEach(function (item) {
            const date = new Date(item.dt * 1000);
            const time = date.toLocaleTimeString([], {
                hour: "numeric"
            });
            const card = document.createElement("div");
            card.className = "hour-card";
            card.innerHTML = `
                <p>${time}</p>
                <span>
                    <img
                        src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"
                        alt="${item.weather[0].description}"
                    >
                </span>
                <h3>${Math.round(item.main.temp)}°C</h3>
            `;
            hourlyContainer.appendChild(card);
        });
        const days = {};
        data.list.forEach(function (item) {
            const date = item.dt_txt.split(" ")[0];
            if (!days[date]) {
                days[date] = item;
            }
        });
        Object.values(days)
            .slice(0, 5)
            .forEach(function (item) {
                const date = new Date(item.dt * 1000);
                const day = date.toLocaleDateString([], {
                    weekday: "long"
                });
                const card = document.createElement("div");
                card.className = "forecast-card";
                card.innerHTML = `
                    <p>${day}</p>
                    <span>
                        <img
                            src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"
                            alt="${item.weather[0].description}"
                        >
                    </span>
                    <h3>${Math.round(item.main.temp)}°C</h3>
                    <small>
                        ${item.weather[0].description}
                    </small>
                `;
                forecastContainer.appendChild(card);
            });
    }
    catch (error) {
        alert(error.message);

    }
}
searchBtn.addEventListener("click", function () {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Please enter a city name");
        return;
    }
    getWeather(city);
    getForecast(city);
});