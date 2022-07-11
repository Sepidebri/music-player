const playsongBtn = document.querySelector(".circle-inner");
const audio = document.querySelector("audio");
const iconPlayPause = document.querySelector(".play-pause");
const spinCircle = document.querySelector(".circle-outer");
const musicName = document.querySelector(".name-music");
const musicArtist = document.querySelector(".name-artist");
const musicImage = document.querySelector(".inner-container");
const musicProgress = document.querySelector(".progress-music");
const musicForward = document.getElementById("forward");
const slidingTagLiAfterStyle = document.createElement("style");

document.addEventListener("DOMContentLoaded", getSong);
musicForward.addEventListener("click", forward);
playsongBtn.addEventListener("click", () => {
  try {
    if (iconPlayPause.classList.contains("fa-play")) {
      iconPlayPause.classList.remove("fa-play");
      iconPlayPause.classList.add("fa-pause");

      slidingTagLiAfterStyle.innerHTML = `
      .circle-outer::after{
        display: block;
        border-radius: 50%;
        padding: 0.6em;
        content:"";
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
         animation: spinner 1s infinite ;
        background:var(--lilac-color);
        background: linear-gradient(90deg, var(--lilac-color) 35%, var(--pink-color) 100%); 
    } 
      `;
      document.head.appendChild(slidingTagLiAfterStyle);
      playSong();
    } else {
      iconPlayPause.classList.remove("fa-pause");
      iconPlayPause.classList.add("fa-play");
      slidingTagLiAfterStyle.innerHTML = "";
      pauseSong();
    }
  } catch (e) {
    console.log(e);
  }
});

function playSong() {
  audio.play();
}

function pauseSong() {
  audio.pause();
}

async function forward() {
  try {
    await getSong();
  } catch (e) {}
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function getSong() {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "c1dea550f0msh503ac19dfcee8cbp1f92f7jsnede2d0d9a6ea",
        "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      },
    };

    const response = await fetch(
      "https://shazam.p.rapidapi.com/songs/list-recommendations?key=484129036&locale=en-US",
      options
    );
    const { tracks } = await response.json();
    const random = randomIntFromInterval(0, tracks.length);
    audio.src = tracks[random].hub.actions[1].uri;
    musicName.textContent = tracks[random].title;
    musicArtist.textContent = tracks[random].subtitle;
    // musicProgress.max = audio.duration;
    musicImage.style.cssText += `padding: 2em 3em 2em 2em;border-radius: 0.5em;background-image: url(${tracks[random].images.background});background-repeat: no-repeat;background-position: center;background-size: cover;`;
  } catch (e) {
    console.log(e);
  }
}
