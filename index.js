/**
 * Challenge: get a random image from Unsplash and set it as the background
 *
 * Part 1:
 *
 * URL: https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature
 * (You can change the "query" at the end to whatever theme you want)
 *
 * Change the body's backgroundImage to:
 * `url(<insert the URL of the iamge from the API here>)`
 *
 * (You may need to dig around the response body a bit to find this URL)
 *
 * (Note I've already added some CSS to resize the image within the window.
 * Instructions for this were found on CSS Tricks:
 * https://css-tricks.com/perfect-full-page-background-image/#awesome-easy-progressive-css3-way)
 */

const body = document.querySelector("body");
const imageAuthor = document.getElementById("imageAuthor");
const cryptoHead = document.getElementById("crypto-head");

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=aeroplanes")
  .then((response) => response.json())
  .then((data) => {
    //console.log(data.urls.regular);
    //console.log(data.user.name);
    body.style.backgroundImage = `url(${data.urls.regular})`;
    imageAuthor.textContent = `${data.user.name}`;
  })

  .catch((err) => {
    body.style.backgroundImage = `url(https://images.unsplash.com/photo-1517933508318-acc52a49cc04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzkzNjU1OTd8&ixlib=rb-4.0.3&q=80&w=1080)`;
  });

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
  .then((response) => {
    if (!response.ok) {
      throw Error("something went wrong");
    }
    return response.json();
  })
  .then((data) => {
    cryptoHead.innerHTML = `
        <img src=${data.image.small} />
        <span> ${data.name} </span>
    
    `;
  })
  .catch((err) => console.error(err));
