import { useState } from "react";
import WeatherDesk from "./assets/Weather3.jpg";
import WeatherMob from "./assets/Weather2.jpg";
import Search from "./assets/Search.png";
import Error from "./assets/Error.svg";

const API_key = "f4fcc118e3fb61e68fca2c8a95df9e90";

function App() {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWeather, setShowWeather] = useState(null);
  const [apiData, setApiData] = useState(null);

  const weatherTypes = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    },
  ];

  const fetchWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_key}`;

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setApiData(null);
        if (data.cod == 404 || data.cod == 400) {
          setShowWeather([
            {
              type: "Not Found",
              img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
            },
          ]);
        }
        setShowWeather(
          weatherTypes.filter(
            (weather) => weather.type === data.weather[0].main
          )
        );
        console.log(data);
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    setLocation("");
  };

  return (
    <div className="relative font-writing">
      <img
        src={WeatherDesk}
        alt="/"
        className="filter: blur-sm bg-cover bg-fixed w-screen h-screen hidden md:block"
      />
      <img
        src={WeatherMob}
        className="filter: blur-sm bg-cover bg-fixed w-screen h-screen md:hidden"
        alt="/"
      />
      <div className="bg-black w-screen h-screen absolute top-0 bottom-0 left-0 right-0 opacity-30"></div>
      <div className="absolute top-0 right-0 left-0 bottom-0 grid place-content-center">
        <div className="w-full flex flex-col">
          <div className="flex justify-center items-center">
            <input
              type="text"
              value={location}
              placeholder="Enter Location"
              onChange={(event) => setLocation(event.target.value)}
              className="outline-none p-2 uppercase rounded-md font-bold"
            />
            <button>
              <img
                src={Search}
                alt="/"
                className="w-8 mx-2"
                onClick={fetchWeather}
              />
            </button>
          </div>
          <div
            className={`text-white  flex flex-col justify-between
          ${showWeather ? "block" : "hidden"}`}
          >
            {loading ? (
              <div>
                <h1 className="text-2xl text-center font-bold bg-slate-300 p-4 bg-opacity-[0.2] rounded-md mt-4">
                  PLEASE WAIT...
                </h1>
              </div>
            ) : (
              showWeather && (
                <div className="py-2 text-white">
                  {apiData && (
                    <h1 className="text-2xl md:text-4xl uppercase">{apiData?.name}</h1>
                  )}
                  <div className="temp">
                    {apiData && (
                      <p className="text-4xl md:text-8xl font-bold">
                        {apiData?.main.temp.toFixed()}&#176;C
                      </p>
                    )}
                  </div>
                  <div className="description text-center bg-slate-300 items-center p-4 bg-opacity-[0.2] rounded-lg">
                    <p className="uppercase text-2xl font-bold">{showWeather[0]?.type}</p>
                    <img
                      src={showWeather[0]?.img}
                      className="w-20 md:w-40 mx-auto"
                      alt="/"
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        {loading ? (
          <div className="hidden"></div>
        ) : (
          showWeather && (
            apiData && (
             <div className="text-xl sm:text-xl flex flex-col md:flex-row text-white text-center w-screen md:w-[26rem] my-4 rounded-xl pt-2 md:py-3 md:justify-evenly bg-slate-300 p-4 bg-opacity-[0.2] uppercase">
              <div className="feels-like my-2 bg-slate-300 bg-opacity-[0.2] rounded-md p-4">
                {apiData && <p>{apiData?.main.feels_like}&#176;C</p>}
                <p className="text-base">Feels Like</p>
              </div>
              <div className="humidity my-2 mx-2 bg-slate-300 bg-opacity-[0.2] rounded-md p-4">
                {apiData && <p>{apiData?.main.humidity}%</p>} 
                <p className="text-base">Humidity</p>
              </div>
              <div className="Winds my-2 bg-slate-300 bg-opacity-[0.2] rounded-md p-4">
                {apiData && <p>{apiData?.wind.speed}KM/H</p>}
                <p className="text-base">Wind</p>
              </div>
            </div>
            )            
          )
        )}
      </div>
    </div>
  );
}

export default App;
