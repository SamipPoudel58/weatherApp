let key = "HqtGWbay3uW7BngNXLelS3bc85Obb1bZ";
key = "6e13b045a89cdb9342dfa6718ed3d451";

// get weather information
const getWeather = async (city) => {
  base = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

  const response = await fetch(base);
  const data = await response.json();
  return data;
};
