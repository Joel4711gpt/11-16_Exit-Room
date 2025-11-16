const state = {
  totalTime: 60,
  remainingTime: 60,
  currentRiddle: 0,
  totalRiddles: 5,
  keyCollected: false,
  doorUnlocked: false,
  gameActive: false,
  scene: null,
};

const refs = {
  time: document.getElementById("time"),
  message: document.getElementById("message"),
  key: document.getElementById("key"),
  clue1: document.getElementById("clue1"),
  clue2: document.getElementById("clue2"),
  door: document.getElementById("door"),
  background: document.getElementById("room-background"),
  tick: document.getElementById("audio-tick"),
  doorOpen: document.getElementById("audio-door-open"),
  success: document.getElementById("audio-success"),
  fail: document.getElementById("audio-fail"),
};

const interactiveElements = [refs.key, refs.clue1, refs.clue2, refs.door];
let timerId = null;

function init() {
  loadScene()
    .then(startGame)
    .catch((error) => {
      console.error("Szene konnte nicht geladen werden:", error);
      refs.message.textContent = "Szene konnte nicht geladen werden.";
      setInteractionEnabled(false);
    });
}

async function loadScene() {
  const response = await fetch("scenes/scene1.json");
  if (!response.ok) {
    throw new Error(`HTTP-Status ${response.status}`);
  }
  const scene = await response.json();
  state.scene = scene;
  state.totalRiddles = scene.riddles.length;
  applyScene(scene);
}

function applyScene(scene) {
  refs.background.src = scene.background;
  scene.objects.forEach((obj) => {
    const element = document.getElementById(obj.id);
    if (!element) return;
    element.style.top = obj.position.top;
    element.style.left = obj.position.left;
  });
  refs.message.textContent = scene.riddles[0].riddleText;
}

function startGame() {
  state.gameActive = true;
  state.currentRiddle = 0;
  state.remainingTime = state.totalTime;
  state.keyCollected = false;
  state.doorUnlocked = false;
  refs.clue2.classList.add("hidden");
  refs.door.querySelector("img").src = "assets/images/door-closed.png";
  attachListeners();
  setInteractionEnabled(true);
  refs.time.textContent = state.remainingTime.toString();
  timerId = setInterval(handleTick, 1000);
}

function attachListeners() {
  refs.key.addEventListener("click", () => handleInteraction("key"));
  refs.clue1.addEventListener("click", () => handleInteraction("clue1"));
  refs.clue2.addEventListener("click", () => handleInteraction("clue2"));
  refs.door.addEventListener("click", () => handleInteraction("door"));
}

function handleInteraction(objectId) {
  if (!state.gameActive) return;
  const riddles = state.scene?.riddles ?? [];
  const currentRiddle = riddles[state.currentRiddle];
  if (!currentRiddle) return;

  if (objectId !== currentRiddle.correctObjectId) {
    return;
  }

  if (objectId === "key") {
    state.keyCollected = true;
  }

  if (objectId === "clue1") {
    refs.clue2.classList.remove("hidden");
  }

  if (objectId === "door") {
    if (state.currentRiddle === 3 && !state.doorUnlocked) {
      if (!state.keyCollected) {
        return;
      }
      state.doorUnlocked = true;
    }
  }

  progressRiddle();
}

function progressRiddle() {
  state.currentRiddle++;
  if (state.currentRiddle >= state.totalRiddles) {
    winGame();
  } else {
    updateRiddleMessage();
  }
}

function updateRiddleMessage() {
  const riddles = state.scene?.riddles ?? [];
  const nextRiddle = riddles[state.currentRiddle];
  if (nextRiddle) {
    refs.message.textContent = nextRiddle.riddleText;
  }
}

function handleTick() {
  if (!state.gameActive) return;
  state.remainingTime -= 1;
  if (state.remainingTime < 0) {
    state.remainingTime = 0;
  }
  refs.time.textContent = state.remainingTime.toString();
  playTick();

  if (state.remainingTime <= 0) {
    loseGame();
  }
}

function playTick() {
  refs.tick.currentTime = 0;
  refs.tick.play().catch(() => {});
}

function winGame() {
  endGame();
  refs.door.querySelector("img").src = "assets/images/door-open.png";
  refs.message.textContent = "Geschafft! Die Tür steht offen!";
  refs.doorOpen.currentTime = 0;
  refs.doorOpen.play().catch(() => {});
  refs.success.currentTime = 0;
  refs.success.play().catch(() => {});
}

function loseGame() {
  endGame();
  refs.message.textContent = "Zeit abgelaufen! Der Raum bleibt verschlossen.";
  refs.fail.currentTime = 0;
  refs.fail.play().catch(() => {});
}

function endGame() {
  state.gameActive = false;
  clearInterval(timerId);
  setInteractionEnabled(false);
}

function setInteractionEnabled(enabled) {
  const pointerValue = enabled ? "auto" : "none";
  interactiveElements.forEach((el) => {
    el.style.pointerEvents = pointerValue;
  });
}

window.addEventListener("DOMContentLoaded", init);
