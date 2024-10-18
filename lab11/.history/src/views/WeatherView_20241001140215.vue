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
    </div>
</template>
