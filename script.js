const timerOption = document.getElementById("timer");
const timerModal = document.getElementById("timer-modal");
const timerClose = document.getElementById("timer-close");
const hrsInput = document.getElementById("set-hours");
const minsInput = document.getElementById("set-mins");
const secsInput = document.getElementById("set-secs");
const hrs = document.getElementById("hrs");
const mins = document.getElementById("mins");
const secs = document.getElementById("secs");
const setBtn = document.getElementById("set-btn");
const startStopBtn = document.getElementById("start-stop-btn");
const clearBtn = document.getElementById("clear-btn");

let interval = null;
let remainingSeconds = 1500;

setBtn.addEventListener("click", () => {
  const HI = hrsInput.value === "" ? 0 : hrsInput.value;
  const MI = minsInput.value === "" ? 0 : minsInput.value;
  const SI = secsInput.value === "" ? 0 : secsInput.value;

  if (HI >= 0 && MI >= 0 && SI >= 0) {
    remainingSeconds = parseInt(HI) * 3600 + parseInt(MI) * 60 + parseInt(SI);
    updateInterface();
  }
  hrsInput.value = "";
  minsInput.value = "";
  secsInput.value = "";
});

function updateControl() {
  if (interval === null) {
    startStopBtn.innerHTML = "START";
    startStopBtn.style.backgroundColor = "#21c6a8";
  } else {
    startStopBtn.innerHTML = "PAUSE";
    startStopBtn.style.backgroundColor = "#f4af47";
  }
}

function updateInterface() {
  const hour = Math.floor(remainingSeconds / 3600);
  const minute = Math.floor((remainingSeconds - hour * 3600) / 60);
  const second = remainingSeconds % 60;

  hrs.innerHTML = hour.toString().padStart(2, "0");
  mins.innerHTML = minute.toString().padStart(2, "0");
  secs.innerHTML = second.toString().padStart(2, "0");
}

function start() {
  if (remainingSeconds === 0) return;
  interval = setInterval(() => {
    remainingSeconds--;
    updateInterface();
    if (remainingSeconds === 0) {
      stop();
    }
  }, 1000);
  updateControl();
}

function stop() {
  clearInterval(interval);
  interval = null;
  updateControl();
}

startStopBtn.addEventListener("click", () => {
  if (interval === null) {
    start();
  } else {
    stop();
  }
});

clearBtn.addEventListener("click", () => {
  stop();
  remainingSeconds = 0;
  updateInterface();
});

timerOption.addEventListener("click", () => {
  overlayOn();
  timerModal.style.scale = 1;
});

timerClose.addEventListener("click", () => {
  timerModal.style.scale = 0;
  overlayOff();
  stop();
  remainingSeconds = 0;
  updateInterface();
});
