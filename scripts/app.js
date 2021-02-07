const body = document.querySelector("body");
const container = document.querySelector(".container");
const city = document.querySelector(".city");
const condition = document.querySelector(".condition");
const tempDigit = document.getElementById("tempDigit");
const iconBox = document.querySelector(".icon");
const icon = document.querySelector(".icon img");
const searchbar = document.querySelector(".searchbar");
const temperature = document.querySelector(".temperature");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((pos) => {
    const lon = pos.coords.longitude;
    const lat = pos.coords.latitude;

    baseURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6e13b045a89cdb9342dfa6718ed3d451`;
    fetch(baseURL)
      .then((res) => res.json())
      .then((data) => updateUI(data))
      .catch((err) => console.error(err));
  });
}

let weatherInfo = {
  defaultUnit: "celsius",
  city: "",
  temp: null,
  description: "",
  icon: "",
};

const updateUI = (data) => {
  const { name, main, weather } = data;

  weatherInfo.city = name;
  weatherInfo.temp = main.temp;
  weatherInfo.description = weather[0].description;
  weatherInfo.icon = weather[0].icon;

  city.innerText = weatherInfo.city;
  condition.innerText = weatherInfo.description;
  tempDigit.innerHTML =
    weatherInfo.defaultUnit === "celsius"
      ? Math.round(Number(weatherInfo.temp) - 273.15) + "&deg;"
      : Math.round(
          (Number(weatherInfo.temp) - 273.15).toFixed(2) * (9 / 5) + 32
        ) + "&deg;";
  icon.src = `http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`;

  if (weatherInfo.icon.charAt(2) === "n") {
    body.style.backgroundImage = "radial-gradient(at top, #6157a5, #28205f)";
  } else if (weatherInfo.icon.charAt(2) === "d") {
    body.style.backgroundImage = "radial-gradient(at top, #75bcfa, #4062df)";
  }
};

const updateCity = async (city) => {
  // const cityDets = await getCity(city);
  const weather = await getWeather(city);

  console.log(weather);
  return weather;
};

searchbar.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = searchbar.city.value.trim();
  searchbar.reset();

  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
console.log(weatherInfo);

temperature.addEventListener("click", (e) => {
  console.log(e);
  if (weatherInfo.defaultUnit === "celsius") {
    tempDigit.innerHTML =
      Math.round(
        (Number(weatherInfo.temp) - 273.15).toFixed(2) * (9 / 5) + 32
      ) + "&deg;";
  } else {
    tempDigit.innerHTML =
      Math.round((Number(weatherInfo.temp) - 273.15).toFixed(2)) + "&deg;";
  }
  weatherInfo.defaultUnit =
    weatherInfo.defaultUnit === "celsius" ? "fahrenheit" : "celsius";
});
