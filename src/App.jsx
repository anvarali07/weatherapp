import './App.css';
import clearIcon from './assets/clear.svg';
import cloudIcon from './assets/cloud.svg';
import drizzleIcon from './assets/drizzle.svg';
import rainIcon from './assets/rain.svg';
import snowIcon from './assets/snow.svg';
import WeatherDetails from './components/WeatherDetails';
import searchIcon from './assets/search.svg';
import { useState } from 'react';
import { useEffect } from 'react';

const App = () => {
  let api_key = "b8c00fbf6449f8304c8285ddcca60b71";

  const [searchtext, setSearchtext] = useState('chennai');
  const [icon, setIcon] = useState(clearIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState('chennai');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState(0);
  const [log,setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":drizzleIcon,
    "03n":drizzleIcon,
    "04d":drizzleIcon,
    "04n":drizzleIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon
  }

  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchtext}&appid=${api_key}&units=Metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      if(data.cod == "404"){
        setCityNotFound(true);
        setLoading(false)
        console.log("city not found");
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);
      
    } catch (error) {
      console.log('error occured',error.message);
      setError('An error occured while fetching weather data..');
    }finally{
      setLoading(false)
    }
  }
  const handleCity = (e) => {
      setSearchtext(e.target.value);
  }
  const handleKeyDown = (e) => {
      if(e.target.value == 'Enter') {
        search();
      }
  }

  useEffect(() => {
    search();
  },[])

  return (
    <>
     <div className='container'>
      <div className="input-container">
        <input type="text" 
        className='cityInput' 
        placeholder='Search City..' 
        onChange={handleCity} 
        onKeyDown={handleKeyDown}
        value={searchtext}/>
        <div className="search-icon">
          <img src={searchIcon} alt="search" onClick={search}/>
        </div>
      </div>
       {loading &&  <div className='loading-message'>Loading...</div>}
       {error &&  <div className='error'>{error}</div>}
       {cityNotFound && <div className='city-not-found'>City Not Found</div>}
       {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>}
      <hr className='line'/>
      <p>Designed By <b style={{color:'black', fontWeight:'600', opacity:'.8'}}>Anvar Ali</b></p>
     </div>
    </>
  )
}

export default App
