import React from 'react'
import '../css/WeatherDetails.css'
import humidityIcon from '../assets/humidity.svg';
import windIcon from '../assets/wind.svg';

const WeatherDetails = ({icon, temp, city, country, lat, log, humidity, wind}) => {
  return (
   <>
     <div className='image'>
      <img src={icon} alt= "Images" />
    </div>
    <div className='temp'>{temp}°C</div>
    <div className='location'>{city}</div>
    <div className='country'>{country}</div>
    <div className="card">
        <div>
            <span className="lat">Latitude</span>
            <span className='val'>{lat}</span>
        </div>
        <div>
            <span className="log">Longitude</span>
            <span className='val'>{log}</span>
        </div>
    </div>
    <div className="data-container">
        <div className="element">
            <img src={humidityIcon} alt="huminity" className='icon'/>
            <div className="data">
                <div className="percentage">{humidity} %</div>
                <div className="text">Humidity</div>
            </div>           
        </div>
        <div className="element">
            <img src={windIcon} alt="windIcon" className='icon'/>
            <div className="data">
                <div className="percentage">{wind} km/h</div>
                <div className="text">Wind Speed</div>
            </div>           
        </div>
    </div>
   </>
  )
}

export default WeatherDetails
