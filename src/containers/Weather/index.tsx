import React, { useState, useEffect } from 'react';
import { round } from 'mathjs';
import Moment from 'moment';

import { WeatherResponse, CityResponse } from './interfaces';
import './styles.css';

const openWeatherAPIKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

// Flow
// 1. Enter city into search
// 2. (probably change to button push to save API calls) useEffect to get list of cities
// 3. Select a city to get weatherResults
const Weather = () => {
    const [searchInput, setSearchInput] = useState('');
    const [cityResults, setCityResults] = useState<CityResponse[]>([])
    const [selectedCity, setSelectedCity] = useState<CityResponse|undefined>(undefined);
    const [weatherResults, setWeatherResults] = useState<WeatherResponse|undefined>(undefined);

    // Note: searchCity was in a useEffect, but to save on API calls I moved to a search function
    const searchCity = () => {
        if (searchInput.length > 2) { 
            const apiCall = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${openWeatherAPIKey}`
            fetch(apiCall)
                .then((resp) => resp.json())
                .then((data) => {
                    console.log("CITY RESULTS", data)
                    if (data) {
                        setCityResults(data);
                    }
                });
        }
    }
        
    // upon clicking a city from the options, we get the data for that city
    useEffect(() => {
        if (selectedCity?.lat && selectedCity?.lon) {
            const units = 'imperial';
            const exclude = ['minutely'].join(',');
            const apiCall = `https://api.openweathermap.org/data/3.0/onecall?lat=${selectedCity.lat}&lon=${selectedCity.lon}&exclude=${exclude}&units=${units}&appid=${openWeatherAPIKey}`
            fetch(apiCall)
                .then((resp) => resp.json())
                .then((data) => {
                    console.log("WEATHER RESULTS", data)
                    if (data) {
                        setWeatherResults(data);
                    }
                });
        }
    }, [selectedCity])

    return (
      <div>
        {/* TODO - add a loading GIF */}
        <label>Enter city: <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/></label>
        <button onClick={() => searchCity()}>Search</button>
        {
            cityResults.length > 0 && (
                <div className="city-search-results">
                    {cityResults.map((city) => (
                        <div key={`${city.name}-${city.state}-${city.country}`}>
                            <button onClick={() => {
                                setSelectedCity(city);
                                setCityResults([]);
                            }}>
                                {city.name}, {city.state}, {city.country}
                            </button>
                        </div>
                    ))}
                </div>
            )
        }
        {weatherResults && (
            <div>
                <h3>{selectedCity?.name}, {selectedCity?.state}, {selectedCity?.country}</h3>
                <div className="weather-results">
                    <div>
                        <p>{new Date(weatherResults.current.dt*1000).toLocaleString('en')}</p>
                        <p className="weather-result-item">Current: {round(weatherResults.current.temp)}°</p>
                        <p className="weather-result-item">Feels like: {round(weatherResults.current.feels_like)}°</p>
                        <p className="weather-result-item">Humidity: {weatherResults.current.humidity}%</p>
                    </div>
                    <div>
                        <p>Hourly Look</p>
                    </div>
                    <div>
                        <p>Daily Look</p>
                    </div>
                </div>
            </div>
        )}
      </div>  
    );
}

export default Weather