import React from 'react'
import './WeatherCard.css'
import '../input/input'
import geo_ico from './icon _location.png'
import icon_temperature from './icon _temperature.png'


const WeatherCard = ({weather, isLoading, isActive, date, error}) => {
  if (error === false) {
    return (
      <div className='WeatherCard'>
          {isActive ? 
              <div>
                  {isLoading ? 
                    <div className='wInfo'>Loading....</div> : 
                    <div>
                      <div className='geo_info'>
                        <p className='location'>{weather.location.country} {weather.location.name}</p>
                        <img src={geo_ico} />
                      </div>
                      <div>
                        <p className='date'>{date(weather.location.localtime)}</p>
                      </div>
                      <div className='temp'>
                        <img className='term' src={icon_temperature} alt="" />
                        <p>{weather.current.temp_c}</p>
                        <img className='ico' src={weather.current.condition.icon} alt="" />
                      </div>
                      <div className='wInfo'>
                        <div>
                          <p>Ветер</p>
                          <p>{weather.current.wind_mph} км/ч</p>
                          
                        </div>
                        <div>
                          <p>Влажность</p>
                          <p>{weather.current.humidity} %</p>
                        </div>
                        <div>
                          <p>Давление</p>
                          <p>{weather.current.pressure_mb} гПа</p>
                        </div>
                      </div>
                    </div>
                  }
              </div>:
              null
          }    
      </div>
    )
  }else {
    return(
      <div className='WeatherCard'>
        <p className='location'>Город не найден</p>
      </div>
    )
  }
}
export default WeatherCard