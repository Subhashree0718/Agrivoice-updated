import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTemperatureHigh, FaCloudSun, FaCity, FaWater } from 'react-icons/fa';
import './App.css';

const API_KEY = 'a3e1f560c3703832f3622fc38aa221e2';
const SOIL_PH_API = 'YOUR_SOIL_PH_API_URL'; // Replace with your soil pH API URL

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [soilPH, setSoilPH] = useState(null);
    const [cityName, setCityName] = useState('Chennai'); // Default city name

    useEffect(() => {
        fetchWeatherData();
        fetchSoilPH();
        const handleMouseMove = (e) => {
            const cursor = document.querySelector('.cursor');
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
            setWeatherData(response.data);
        } catch (error) {
            console.error("Error fetching weather data", error);
        }
    };

    const fetchSoilPH = async () => {
        try {
            const response = await axios.get(SOIL_PH_API);
            setSoilPH(response.data.soilPH);
        } catch (error) {
            console.error("Error fetching soil pH data", error);
        }
    };

    return (
        <div className="app flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <div className="cursor"></div>
            <div className="text-center p-8 mb-8">
                <h1 className="text-6xl mb-8 neon-text animate-bounce">AGRI-VOICE</h1>
            </div>
            <div className="mb-8 box p-4 text-center flex items-center animate-fade-in">
                <FaCity className="h-12 w-12 mr-4 neon-text" />
                <h2 className="text-4xl">City: {cityName}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="box p-4 text-center flex items-center animate-fade-in">
                    <FaTemperatureHigh className="h-12 w-12 mr-4 neon-text animate-pulse" />
                    {weatherData && (
                        <div className="weather">
                            <h2 className="text-4xl">Temperature</h2>
                            <p className="text-2xl">{weatherData.main.temp}°C</p>
                        </div>
                    )}
                </div>
                <div className="box p-4 text-center flex items-center animate-fade-in">
                    <FaCloudSun className="h-12 w-12 mr-4 neon-text animate-pulse" />
                    {weatherData && (
                        <div className="weather">
                            <h2 className="text-4xl">Weather</h2>
                            <p className="text-2xl">{weatherData.weather[0].description}</p>
                        </div>
                    )}
                </div>
                <div className="box p-4 text-center flex items-center animate-fade-in">
                    <FaCloudSun className="h-12 w-12 mr-4 neon-text animate-pulse" />
                    {weatherData && (
                        <div className="weather">
                            <h2 className="text-4xl">Soil pH Level</h2>
                            <p className="text-2xl">6.5</p>
                        </div>
                    )}
                </div>
                
            </div>
        </div>
    );
}

export default App;
