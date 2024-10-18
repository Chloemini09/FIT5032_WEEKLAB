<template>
    <div class="container">
      <div class="header">
        <h1>WEATHER APP</h1>
        <div class="search-bar">
          <input
            type="text"
            v-model="city"
            placeholder="Enter city name"
            class="search-input"
          />
          <button @click="searchByCity" class="search-button">Search</button>
        </div>
      </div>
      <main>
        <div v-if="weatherData">
          <h2>
            {{ weatherData.name }}, {{ weatherData.sys.country }}
          </h2>
          <div>
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
          </div>
          <span>{{ weatherData.weather[0].description }}</span>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  const apikey = "aad7b3c3f2d7c2d41b66d5ab5edd20f8";
  
  export default {
    name: "App",
    data() {
      return {
        city: "",
        weatherData: null,
        hourlyForecast: [],
        dailyForecast: [],
      };
    },
    computed: {
      temperature() {
        return this.weatherData
          ? Math.floor(this.weatherData.main.temp)
          : null;
      },
      iconUrl() {
        return this.weatherData
          ? `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
          : null;
      },
    },
    mounted() {
      this.fetchCurrentLocationWeather();
    },
    methods: {
      async fetchCurrentLocationWeather() {
        console.log("Fetching current location weather");
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
            await this.fetchWeatherData(url);
          });
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      },
      async fetchWeatherData(url) {
        console.log(`Fetching weather data from URL: ${url}`);
        try {
          const response = await axios.get(url);
          console.log("Weather data received:", response.data);
          this.weatherData = response.data;
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      },
      async searchByCity() {
        console.log(`Searching for city: ${this.city}`);
        if (this.city.trim() === "") {
          console.warn("City name is empty. Please enter a city name.");
          return;
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}&units=metric`;
        await this.fetchWeatherData(url);
      }
    }
  };
  </script>
  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
    background: linear-gradient(to right, #6dd5fa, #2980b9);
    color: #333;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
  }
  
  .header h1 {
    font-size: 3em;
    color: white;
    margin-bottom: 20px;
  }
  
  .search-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .search-input {
    padding: 10px;
    font-size: 16px;
    border: 2px solid #2980b9;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  .search-input:focus {
    border-color: #6dd5fa;
  }
  
  .search-button {
    padding: 10px 20px;
    margin-left: 10px;
    font-size: 16px;
    color: white;
    background-color: #2980b9;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .search-button:active {
    background-color: #1a5a74;
    transform: scale(0.98);
  }
  
  .search-button:hover {
    background-color: #6dd5fa;
  }
  
  main {
    background: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    font-size: 2em;
    margin: 0 0 10px;
  }
  
  p {
    font-size: 1.5em;
    margin: 10px 0;
  }
  
  img {
    width: 100px;
    height: 100px;
  }
  
  span {
    font-size: 1.2em;
    color: #555;
  }
  
  @media (max-width: 600px) {
    .header h1 {
      font-size: 2em;
    }
  
    .search-input, .search-button {
      font-size: 14px;
      padding: 8px;
    }
  
    h2 {
      font-size: 1.5em;
    }
  
    p {
      font-size: 1.2em;
    }
  
    img {
      width: 80px;
      height: 80px;
    }
  }
  </style>