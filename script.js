const apiKey = 'your key';

async function getWeatherByCity() {
    const city = document.getElementById('city').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            updateWeather(data);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (response.ok) {
                    updateWeather(data);
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }, error => {
            console.error('Error getting location:', error);
            alert('Unable to retrieve your location. Please check your settings or try again.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

function updateWeather(data) {
    document.getElementById('wind').textContent = data.wind.speed;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('pressure').textContent = data.main.pressure;
    document.getElementById('weather-desc').textContent = data.weather[0].description.toUpperCase();
    document.getElementById('temperature').textContent = Math.round(data.main.temp);
    document.getElementById('location').textContent = data.name;
}
