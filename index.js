import key from "./settings.js";
const api_key = key;
const api_url = "https://api.openweathermap.org/data/2.5/weather?q="; // {city}

const search_button =  document.getElementById("search-button");
const search_input = document.getElementById("search-input");

const city_searched = document.getElementById("city");

const weather_temp = document.getElementById("temp");
const weather_feels_like = document.getElementById("feels-like");
const weather_temp_max = document.getElementById("temp-max");
const weather_icon = document.getElementById("temp-icon");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

search_button.addEventListener("click", (e) => {    
    e.preventDefault();

    search(search_input.value);
    search_input.value = "";
});

function changeSearchIcon(_to) {
    const search_icon = search_button.children[0];    

    search_icon.classList.toggle("rotate");
    search_icon.innerHTML = _to;    
}

async function search(_city) {
    changeSearchIcon("sync");
    
    var _json_data;
    
    try {
        const response = await fetch(api_url + _city + api_key);
        _json_data = await response.json();
        
        changeSearchIcon("search");

        if(response.status == "400" || response.status == "404") {
            city_searched.innerHTML = "city not found, try again!";
            return false;
        } 
    }
    catch(error) {
        changeSearchIcon("search");
        console.log("ocorreu um erro: " + error);
        return false;
    }
    updateWeather(_json_data);
    return true;
}

function updateWeather(_data) {
    city_searched.innerHTML = _data.name + "/" + _data.sys.country + " - " + _data.weather[0].description; //city name

    weather_temp.innerHTML = Math.round(_data.main.temp) + "°C"; //temp
    
    weather_feels_like.innerHTML = "feels like: " + _data.main.feels_like.toFixed(1) + "°C";
    weather_temp_max.innerHTML = "max: " + _data.main.temp_max.toFixed(1)  + "°C";
    weather_icon.setAttribute("src", "https://openweathermap.org/img/wn/" + _data.weather[0].icon + "@2x" + ".png"); //icon weather
    weather_icon.setAttribute("alt", _data.weather[0].description + " icon");

    humidity.innerHTML = _data.main.humidity + "%"; //humidity
    wind.innerHTML = Math.round(parseFloat(_data.wind.speed) * 3.6) + "km/h"; //wind speed
    

}
