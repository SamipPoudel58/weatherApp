const key = "HqtGWbay3uW7BngNXLelS3bc85Obb1bZ";

// get weather information
const getWeather = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();
  return data[0]; //first item of the list is the most appropriate result
};

//get city information
const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

// getCity("manchester")
//   .then((data) => getWeather(data.Key))
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));
