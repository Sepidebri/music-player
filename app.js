const playsongBtn = document.querySelector(".circle-inner");
const audio = document.querySelector("audio");
const iconPlayPause = document.querySelector(".play-pause");
const spinCircle = document.querySelector(".circle-outer");
const slidingspinCircleAfterStyle = document.createElement("style");

playsongBtn.addEventListener("click", () => {
  try {
    if (iconPlayPause.classList.contains("fa-play")) {
      iconPlayPause.classList.remove("fa-play");
      iconPlayPause.classList.add("fa-pause");
      slidingspinCircleAfterStyle.innerHTML = `
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
      document.head.appendChild(slidingspinCircleAfterStyle);
      playSong();
    } else {
      iconPlayPause.classList.remove("fa-pause");
      iconPlayPause.classList.add("fa-play");
      slidingspinCircleAfterStyle.innerHTML = "";
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
