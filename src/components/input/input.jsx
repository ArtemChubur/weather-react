import React from 'react'
import './input.css'

const Input = ({setCity, getWeather, Rest_Weather, city}) => {
  return (
    <div className='search'>

        <input value={city} onChange={(event) => setCity(event.target.value)} type="text" name="city" placeholder='Введите город' />
        <button onClick={Rest_Weather} className='reset_btn' type='reset'></button>
        <button onClick={getWeather} className='search_btn'></button>

    </div>
  )
}

export default Input