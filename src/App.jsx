import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState();

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      console.log("response", response);
      setWeather(response.data);
      setError("");
    } catch (error) {
      setError("Not Found");
      setWeather(null);
    }
  };

  let backgroundImage
  if(weather){
    switch(weather.weather[0].main){
      case "Clouds":
        backgroundImage="url('Cloudy.jpg')"
        break
      
      case "Clear":
        backgroundImage="url('Sunny.jpg')"
        break
      case"Snow":
        backgroundImage="url('Snow.jpg')"
        break
      case"Rain":
        backgroundImage="url('Rainy.jpg')"
        break
      
        default:
          backgroundImage="url('Sunny.jpg')"
          
    }
  } else{
    backgroundImage="url('Snow.jpg')"

  }
  

  return (
    <div style={{
      backgroundImage:backgroundImage,
      height:"100vh",
      width:"100vh",
      backgroundSize:"cover",
      backgroundPosition:"center",
      display:"flex",
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center"

    }}>
      
    <div>
      
      {weather && <div> <h1>Temperature:{weather.main.temp}</h1> 
      <h2>Humudity:{weather.main.humidity}</h2> 
      </div>}
      {error && <h1>{error}</h1>}

      <div style={{
          padding:"10px"
          
      }}>
        <input
        style={{
        height:"38px",
        padding:"2px",
        marginRight:"20px",
        borderRadius:"8px",
        border:"1px solid #ddd",
        fontSize:"18px"
        }}
        type="text"
        placeholder="Enter City Name"
        onChange={(e) => setCity(e.target.value)}
        value={city}
      />

      <button onClick={getWeather}>Get Weather</button>
      </div>

    </div>
    </div>
  );
}

export default App;
