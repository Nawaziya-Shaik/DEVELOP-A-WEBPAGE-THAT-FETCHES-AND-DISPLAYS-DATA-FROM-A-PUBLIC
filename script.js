const apiKey = "2226674c077f723fc8fbc01432467d59";

function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return;
  fetchWeather(city);
}

function fetchWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log('City Weather API response:', data);
      if (data.cod !== 200) {
        document.getElementById("weatherResult").innerHTML = `<p style='color:red;'>City not found!</p>`;
        return;
      }
      displayWeather(data);
    })
    .catch((error) => {
      console.error('Error fetching city weather:', error);
      document.getElementById("weatherResult").innerHTML = `<p style='color:red;'>Error fetching weather data.</p>`;
    });
}

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log('Location Weather API response:', data);
          if (data.cod !== 200) {
            document.getElementById("weatherResult").innerHTML = `<p style='color:red;'>Location not found!</p>`;
            return;
          }
          displayWeather(data);
        })
        .catch((error) => {
          console.error('Error fetching location weather:', error);
          document.getElementById("weatherResult").innerHTML = `<p style='color:red;'>Error fetching weather data.</p>`;
        });
    }, (error) => {
      console.error('Geolocation error:', error);
      document.getElementById("weatherResult").innerHTML = `<p style='color:red;'>Geolocation error: ${error.message}</p>`;
    });
  }
}

function displayWeather(data) {
  const weatherIcon = getWeatherIcon(data.weather[0].main);
  document.getElementById("weatherResult").innerHTML = `
    <h2><i class="${weatherIcon}"></i> ${data.name}, ${data.sys.country}</h2>
    <p><i class="fas fa-thermometer-half"></i> Temperature: <strong>${data.main.temp}°C</strong></p>
    <p><i class="fas fa-cloud"></i> Condition: <strong>${data.weather[0].main}</strong></p>
    <p><i class="fas fa-tint"></i> Humidity: <strong>${data.main.humidity}%</strong></p>
    <p><i class="fas fa-wind"></i> Wind: <strong>${data.wind.speed} m/s</strong></p>
  `;
}

function getWeatherIcon(condition) {
  switch (condition.toLowerCase()) {
    case "clear": return "fas fa-sun";
    case "clouds": return "fas fa-cloud";
    case "rain": return "fas fa-cloud-showers-heavy";
    case "thunderstorm": return "fas fa-bolt";
    case "snow": return "fas fa-snowflake";
    case "mist": return "fas fa-smog";
    default: return "fas fa-cloud";
  }
}

document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
