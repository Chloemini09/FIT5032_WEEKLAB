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
        <!-- If weatherData is available, display the weather information -->
        <div v-if="weatherData">
          <h2>
            {{ weatherData.name }}, {{ weatherData.sys.country }}
          </h2>
          <div>
            <!-- Display the weather icon and temperature -->
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
          </div>
          <!-- Display weather description -->
          <span>{{ weatherData.weather[0].description }}</span>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  const apikey = "aad7b3c3f2d7c2d41b66d5ab5edd20f8"; 
  
  export default {
    name: "WeatherView",
    data() {
      return {
        city: "",
        weatherData: null,
        hourlyForecast: [],
        dailyForecast: [],
      };
    },
    computed: {
      // Compute temperature in Celsius from Kelvin (which the API returns)
      temperature() {
        return this.weatherData
          ? Math.floor(this.weatherData.main.temp - 273.15)
          : null;
      },
      // Get the current weather icon URL from the API response
      iconUrl() {
        return this.weatherData
          ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
          : null;
      },
    },
    mounted() {
      this.fetchCurrentLocationWeather();
    },
    methods: {
      // Fetch weather data based on the user's current location
      async fetchCurrentLocationWeather() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
            await this.fetchWeatherData(url);
          });
        }
      },
      // Fetch weather data for a specific city entered by the user
      async searchByCity() {
        if (this.city) {
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
          await this.fetchWeatherData(url);
        }
      },
      // Fetch the weather data from the API
      async fetchWeatherData(url) {
        try {
          const response = await axios.get(url);
          this.weatherData = response.data;
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  .header h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .search-bar {
    margin-bottom: 20px;
  }
  
  .search-input {
    padding: 10px;
    font-size: 1rem;
    width: 70%;
  }
  
  .search-button {
    padding: 10px 20px;
    font-size: 1rem;
    margin-left: 10px;
    cursor: pointer;
  }
  
  main {
    margin-top: 20px;
  }
  
  main img {
    width: 50px;
    height: 50px;
  }
  
  main p {
    font-size: 1.5rem;
    margin-top: 10px;
  }
  </style>
  