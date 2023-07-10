const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

document.getElementById("countryName")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("searchBtn").click();
    }
});

search.addEventListener('click', () => {

  const APIKey = '70d7178a6ee8ddde16551e41ac5f9512';
  const city = document.querySelector('.search-box input').value;

  if (city === '')
    return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {

      if (json.cod === '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
      }

      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      const coord = document.querySelector('.coord');
      const image = document.querySelector('.weather-box img');
      const tempеrature = document.querySelector('.weather-box .temperature');
      const tempFeels = document.querySelector('.weather-box .tempFeels');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'img/clear.png';
          break;
        case 'Clouds':
          image.src = 'img/cloud.png';
          break;
        case 'Mist':
          image.src = 'img/mist.png';
          break;
        case 'Rain':
          image.src = 'img/rain.png';
          break;
        case 'Haze':
          image.src = 'img/snow.png';
          break;
        default:
          image.src = '';
      }

      coord.innerHTML = `Д: ${json.coord.lon} Ш: ${json.coord.lat}`;
      tempеrature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      tempFeels.innerHTML = `Ощущается как ${parseInt(json.main.feels_like)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}км/ч`;

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      container.style.height = '590px';

    });
});