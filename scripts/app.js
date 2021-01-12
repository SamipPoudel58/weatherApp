const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const temperature = document.querySelector(".temperature");
const tempDigit = document.getElementById("tempDigit");
const tempUnit = document.getElementById("tempUnit");

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

  details.innerHTML = `
    <h5 class="my-3">${weatherInfo.city}</h5>
    <div class="my-3">${weatherInfo.description}</div>
    <div class="display-4 my-4 temperature">
        <span id="tempDigit">${
          weatherInfo.defaultUnit === "celsius"
            ? (Number(weatherInfo.temp) - 273.15).toFixed(2)
            : (Number(weatherInfo.temp) - 273.15).toFixed(2) * (9 / 5) + 32
        }</span>
        <span id="tempUnit">${
          weatherInfo.defaultUnit === "celsius" ? "&deg;C" : "&deg;F"
        }</span>
    </div>
    `;

  // const iconSrc = `img/icons/${+weather[0].icon.substring(0, 2) + 3}.svg`;
  const iconSrc = `http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`;
  icon.setAttribute("src", iconSrc);

  let timeSrc =
    weatherInfo.icon.charAt(2) === "d" ? "img/day.svg" : "img/night.svg";
  time.setAttribute("src", timeSrc);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  // const cityDets = await getCity(city);
  const weather = await getWeather(city);

  console.log(weather);
  return weather;
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
console.log(weatherInfo);

tempUnit.addEventListener("click", () => {
  if (weatherInfo.defaultUnit === "celsius") {
    details.innerHTML = `
    <h5 class="my-3">${weatherInfo.city}</h5>
    <div class="my-3">${weatherInfo.description}</div>
    <div class="display-4 my-4 temperature">
        <span id="tempDigit">${
          (Number(weatherInfo.temp) - 273.15).toFixed(2) * (9 / 5) + 32
        }</span>
        <span id="tempUnit">&deg;F</span>
    </div>
    `;
  } else {
    details.innerHTML = `
    <h5 class="my-3">${weatherInfo.city}</h5>
    <div class="my-3">${weatherInfo.description}</div>
    <div class="display-4 my-4 temperature">
        <span id="tempDigit">${(Number(weatherInfo.temp) - 273.15).toFixed(
          2
        )}</span>
        <span id="tempUnit">&deg;C</span>
    </div>
    `;
  }
  weatherInfo.defaultUnit =
    weatherInfo.defaultUnit === "celsius" ? "fahrenheit" : "celsius";

  console.log(weatherInfo);
});
