const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".input-field");
const mistakeTag = document.querySelector(".mistake span");
let timeTag = document.querySelector(".time span b");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const popup = document.querySelector(".popup");
const tryAgainBtn = document.querySelector("button");
const timesList = document.querySelectorAll(".times li");

timesList[0].classList.add("active-list");
let timer;
let maxTime = 15;

timesList.forEach((ele) => {
  ele.onclick = () => {
    timesList.forEach((ele) => ele.classList.remove("active-list"));
    ele.classList.add("active-list");
    timeTag.innerText = parseInt(ele.innerHTML);
    maxTime = parseInt(ele.innerHTML);
    resetGame();
  };
});

let timeLeft = maxTime;
let charIndex = inputField.value.length;
let mistakeCount = 0;
let isTyping = false;
let shuffledArray = paragraphs
  .slice()
  .sort(() => Math.random() - 0.5)
  .join(" ");


function randomParagraph() {

  let randIndex = Math.floor(Math.random() * shuffledArray.length);
  typingText.innerHTML = "";
  shuffledArray.split("").forEach((span) => {
    let spanTag = document.createElement("span");
    spanTag.appendChild(document.createTextNode(span));
    typingText.appendChild(spanTag);
  });

  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inputField.focus());
  typingText.addEventListener("click", () => inputField.focus());
}
randomParagraph();

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inputField.value.split("")[charIndex];

  if (charIndex < characters.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    if (typedChar == null) {
      charIndex = inputField.value.length;
      if (characters[charIndex].classList.contains("incorrect")) {
        // mistakeCount--;
      }
      characters[charIndex].classList.remove("incorrect", "correct");
    } else {
      if (characters[charIndex].innerHTML === typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        // mistakeCount++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex = inputField.value.length;
    }

    characters.forEach((ele, i) => {
      if (i > charIndex) {
        ele.classList.remove("incorrect", "correct");
      }
    });

    let mis = [...characters].filter((ele) =>
      ele.classList.contains("incorrect")
    );
    mistakeCount = mis.length;

    mistakeTag.innerText = mistakeCount;
    let wpm = Math.round(
      ((charIndex - mistakeCount) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    characters.forEach((ele) => ele.classList.remove("active"));
    characters[charIndex].classList.add("active");
    cpmTag.innerHTML = charIndex - mistakeCount;
    wpmTag.innerHTML = wpm;
  } else {
    inputField.value = "";
    clearInterval(timer);
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  randomParagraph();
  (timeLeft = maxTime), (charIndex = 0), (mistakeCount = 0);
  isTyping = false;
  timeTag.innerText = timeLeft;
  mistakeTag.innerText = mistakeCount;
  wpmTag.innerHTML = 0;
  cpmTag.innerHTML = 0;
  inputField.value = "";
  clearInterval(timer);

  // Remove active class from all span elements
  typingText.querySelectorAll("span").forEach((span) => {
    span.classList.remove("active");
  });

  // Add active class to the first span element
  typingText.querySelector("span").classList.add("active");
}

inputField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);

document.addEventListener("keydown", (e) => {
  var capsLockOn = e.getModifierState && e.getModifierState("CapsLock");
  localStorage.setItem("capsLockOn", capsLockOn);

  if (!capsLockOn) {
    popup.classList.remove("scale-1");
  } else {
    popup.classList.add("scale-1");
  }
});

window.onload = () => {
  var capsLockStored = localStorage.getItem("capsLockOn") === "true";
  if (!capsLockStored) {
    popup.classList.remove("scale-1");
  } else {
    popup.classList.add("scale-1");
  }
};
