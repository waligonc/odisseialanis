const TRACK_ID = "Jne9t8sHpUc";
const noLines = ["Pensa bem...", "Por favor!", "Tem certeza?", "O roteiro não previa isso 😅"];

const opening = document.querySelector("#opening");
const countdown = document.querySelector("#countdown");
const countdownNumber = document.querySelector("#countdownNumber");
const invitation = document.querySelector("#invitation");
const ending = document.querySelector("#ending");
const musicButton = document.querySelector("#musicButton");
const musicMount = document.querySelector("#musicMount");
const musicIcon = document.querySelector("#musicIcon");
const musicState = document.querySelector("#musicState");
const noButton = document.querySelector("#noButton");
const yesButton = document.querySelector("#yesButton");
const directorNote = document.querySelector("#directorNote");

let musicPlaying = false;
let noCount = 0;

function tulipBars() {
  return "<i></i><i></i><i></i><i></i>";
}

function playMusic() {
  musicMount.innerHTML = `<iframe class="music-frame" src="https://www.youtube-nocookie.com/embed/${TRACK_ID}?autoplay=1&loop=1&playlist=${TRACK_ID}&controls=0&playsinline=1" title="Ironic — Alanis Morissette" allow="autoplay; encrypted-media" tabindex="-1"></iframe>`;
  musicIcon.innerHTML = tulipBars();
  musicState.textContent = "ON";
  musicButton.setAttribute("aria-label", "Pausar trilha sonora");
  musicPlaying = true;
}

function pauseMusic() {
  musicMount.innerHTML = "";
  musicIcon.textContent = "♪";
  musicState.textContent = "PLAY";
  musicButton.setAttribute("aria-label", "Tocar trilha sonora");
  musicPlaying = false;
}

function beginSession() {
  playMusic();
  musicButton.hidden = false;
  opening.classList.add("is-closing");

  window.setTimeout(() => {
    opening.hidden = true;
    countdown.hidden = false;
  }, 650);

  [3, 2, 1].forEach((number, index) => {
    window.setTimeout(() => {
      countdownNumber.textContent = String(number);
    }, 650 + index * 700);
  });

  window.setTimeout(() => {
    countdown.hidden = true;
    invitation.hidden = false;
    window.requestAnimationFrame(() => invitation.classList.add("is-revealed"));
  }, 2750);
}

function moveNoButton() {
  const mobile = window.innerWidth < 620;
  const rangeX = mobile ? 78 : 150;
  const rangeY = mobile ? 42 : 55;
  const x = Math.round((Math.random() * 2 - 1) * rangeX);
  const y = Math.round((Math.random() * 2 - 1) * rangeY);
  noButton.style.transform = `translate(${x}px, ${y}px)`;
}

function tryNo() {
  directorNote.textContent = noLines[noCount % noLines.length];
  directorNote.hidden = false;
  noCount += 1;
  yesButton.style.transform = `scale(${Math.min(1 + noCount * 0.09, 1.36)})`;
  moveNoButton();
}

document.querySelector("#startButton").addEventListener("click", beginSession, { once: true });
musicButton.addEventListener("click", () => (musicPlaying ? pauseMusic() : playMusic()));
yesButton.addEventListener("click", () => {
  invitation.hidden = true;
  ending.classList.add("is-visible");
});

noButton.addEventListener("pointerenter", (event) => {
  if (event.pointerType === "mouse") tryNo();
});
noButton.addEventListener("pointerdown", (event) => {
  if (event.pointerType !== "mouse") {
    event.preventDefault();
    tryNo();
  }
});
noButton.addEventListener("click", (event) => {
  if (event.detail === 0) tryNo();
});
