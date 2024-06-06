fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature") //fetched method to fetch a random nature photo from unsplash
    .then(res => res.json()) //changed data from json to javascript
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`;//pulled in the image url
		document.getElementById("author").textContent = `By: ${data.user.name}`;//displayed the image author
    })
    .catch(err => {
        // Use a default background image by Dodi Achmad if there's an error 
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`;
		document.getElementById("author").textContent = `By: Dodi Achmad`;
    })

fetch("https://api.coingecko.com/api/v3/coins/dogecoin") //fetched and displayed dogecoin information from coingeko
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong");
        }
        return res.json();
    })
    //display dogecoin image,logo, current, low and high prices 
    .then(data => { 
        document.getElementById("crypto-top").innerHTML = ` 
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `;
        document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `;
    })
    .catch(err => console.error(err));
// function to get and display current time
function getCurrentTime() {
    const date = new Date();
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {hour12: false, hour: '2-digit', minute:'2-digit'}); // time displayed in 24hr format
}

setInterval(getCurrentTime, 1000);
// display the current weather based on current geolocation
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available");
            }
            return res.json();
        })
        .then(data => {
            const tempCelcius = Math.round(data.main.temp); //to convert temperature to celcius and display city name
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p> 
            `;
        })
        .catch(err => console.error(err));
});
