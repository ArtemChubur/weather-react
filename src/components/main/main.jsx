import React from 'react'
import './main.css'
import Input from '../input/input'
import WeatherCard from '../weatherCard/weatherCard'
import { useState, useEffect } from 'react'
import { ru } from 'date-fns/locale'
import { format, parseISO } from 'date-fns'

const Main = () => {
  let err = null
  const API = 'c21840e36da34ce4b6a102650230710'
  const [city, setCity] = useState(null)
  const [weather, setWeather] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [error, setError] = useState(false)
  
  const getWeather = async () => {
    setIsLoading(true)
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API}&q=${city}&aqi=no`)
    if (city !== null) {
      try {
        if (response.status === 200) {
          const data = await response.json()
          setWeather(data)
          setIsActive(true)
          setError(false)
        } else if (response.status === 400) {
          setError(true)
        }
      } catch (error) {
          if (response.status === 404) {          
          }
      } finally{
        setIsLoading(false)
      }
    } else{
      setError(true)
    }
  }

  const Rest_Weather = async () => {
    setCity('')
    getGeoWeather()
  }

  const date = () => {
    if (weather.location && weather.location.localtime) {
      const localTime = weather.location.localtime;
      const paddedLocalTime = localTime.replace(/(\b\d{1}:\d{2}\b)/, '0$1');
      const parsedDate = parseISO(paddedLocalTime);
      return format(parsedDate, "dd MMMM yyyy 'г.'", { locale: ru });
    }
    return "";
  }

  function getGeoWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          getWeather(latitude, longitude)

          async function getWeather(latitude, longitude) {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API}&q=${`${latitude} ${longitude}`}&aqi=no`)
            const data = await response.json()
            setWeather(data)
            setIsActive(true)
            setError(false)
          }
          

        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  useEffect(() => {
    getGeoWeather()
  }, []);

  return (
    <main>
      <Input 
        setCity={setCity}
        getWeather={getWeather}
        Rest_Weather = {Rest_Weather}
        city={city}        
      />
       <WeatherCard
          error = {error}
          setCity={setCity}
          getWeather={getWeather}
          date = {date}
          weather={weather}
          isLoading={isLoading}
          isActive={isActive}
        />
    </main>
  )
}
export default Main