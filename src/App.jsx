import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [city, setCity] = useState("")
  const [weather, setWeather]= useState(null)

  const apiKey= import.meta.env.VITE_WEATHER_API_KEY
  
  

  const getWeather= async () => {
    const response = await axios.get (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  console.log("response", response)
  setWeather(response.data)
  }


  return (
    <div>
      {weather && 
      <h1>{weather.main.temp}</h1>
      }
      

      <input type="text" placeholder="Enter City Name" onChange={(e)=>setCity(e.target.value)} value={city}/>

      <button onClick={getWeather} >Get Weather</button>
    </div>
  );
}

export default App;
