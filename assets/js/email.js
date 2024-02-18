var shown = false;
function showhideEmail() {
    if (shown) {
        document.getElementById('email').innerHTML = "Show my email";
        shown = false;
    }
    else {
        var myemail = "<a href='mailto:rayanate" + "@" +
            "mail.uc.edu'> rayanate" + "@" + "mail.uc.edu</a>";
        document.getElementById('email').innerHTML = myemail;
        shown = true;
    }
}

function fetchJoke() {
    $.get('https://v2.jokeapi.dev/joke/Any', function (data) {
        $('#joke-container').html(`
            <p>${data.setup || ''}</p>
            <p>${data.delivery || data.joke || ''}</p>
          `);
    }).fail(function (error) {
        console.error('Error fetching joke:', error);
    });
}

fetchJoke();

setInterval(fetchJoke, 60000);

const apiKey = 'rD28vkNDNAtUjRvS4jcgLJnBII2IbEtZpFY7PtMO';

fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        const apodImage = document.getElementById('apodImage');
        apodImage.src = data.url;
        apodImage.alt = data.title;
    })
    .catch(error => {
        console.error('Error fetching APOD image:', error);
    });

async function getWeatherData(cityName) {
    const API_KEY = '82bf333e96f9446884281940ce9c06b1'; 
    const API_URL = `https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${API_KEY}`;

    try {
        const weatherResponse = await fetch(API_URL);
        const responseData = await weatherResponse.json();
        document.getElementById('city').innerText = responseData.data[0].city_name;
        document.getElementById('weather-icon').src = `https://www.weatherbit.io/static/img/icons/${responseData.data[0].weather.icon}.png`;
        document.getElementById('temperature').innerText = `Temperature: ${responseData.data[0].temp}°C`;
        document.getElementById('description').innerText = `Description: ${responseData.data[0].weather.description}`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

const city = 'Cincinnati';
getWeatherData(city);