//Dom elements stored here//
const body = document.querySelector("body");
const imageAuthor = document.getElementById("imageAuthor");
const cryptoHead = document.getElementById("crypto-head");
const crypto = document.getElementById("crypto");
const time = document.querySelector(".time");
const weather = document.getElementById("weather");

//Image API code, using await operator to make code asyncronous.
//try statment is the code that should be run and the catch statment is what should be run if there is an error.
try {
  const res = await fetch(
    "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=aeroplanes"
  );
  const data = await res.json();
  //console.log(data.urls.regular);
  //console.log(data.user.name);
  body.style.backgroundImage = `url(${data.urls.regular})`;
  imageAuthor.textContent = `${data.user.name}`;
} catch (err) {
  body.style.backgroundImage = `url(https://images.unsplash.com/photo-1517933508318-acc52a49cc04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkzNjU1OTd8&ixlib=rb-4.0.3&q=80&w=1080)`;
}

//Crypto API code. addition of a throw statelent give a custom error.
try {
  const response = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");
  if (!response.ok) {
    throw Error("something went wrong");
  }
  const dataCrypto = await response.json();
  //console.log(data);
  cryptoHead.innerHTML = `
        <img src=${dataCrypto.image.small} />
        <span> ${dataCrypto.name} </span>
    
    `;
  crypto.innerHTML += `
    <p> 💵: R${dataCrypto.market_data.current_price.zar}.00</p>
    <p> 👍: R${dataCrypto.market_data.high_24h.zar}.00</p>
    <p> 👎: R${dataCrypto.market_data.low_24h.zar}.00</p>
    `;
} catch (err) {
  console.error(err);
}

//Time function to give time at local position.
function displayTime() {
  let now = new Date();
  let currentTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  time.textContent = currentTime;
  console.log(`Current Time: ${currentTime}`);
}
//setInterval method is used to update the time every 1000ms
setInterval(displayTime, 1000);

//.getCurrentPosition() is a method to get the current latitude and logitude of the device. async is used to make the code asyncronous and other code can run while we wait to get the information.
navigator.geolocation.getCurrentPosition(async (position) => {
  //console.log(position);
  //try statement to get the weather infomation from the api. lat and long coordinates are added.
  try {
    const resWeather = await fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
    );
    if (!resWeather.ok) {
      throw Error("something went wrong");
    }
    const dataWeather = await resWeather.json();
    const weatherImageUrl = `https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`;
    weather.innerHTML = `
                <img src=${weatherImageUrl} />
                <p class="weather-temp">${Math.round(dataWeather.main.temp)}º</P>
                <p class="weather-city">${dataWeather.name}</P>
            `;
  } catch (err) {
    console.error(err);
  }
});
