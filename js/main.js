const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".input-field");
const mistakeTag = document.querySelector(".mistake span");
const timeTag = document.querySelector(".time span b");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");

let timer;
let maxTime = 10;
let timeLeft = maxTime;
let charIndex = 0;
let mistakeCount = 0;
let isTyping = false;

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  paragraphs[randIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });

  document.addEventListener("keydown", () => inputField.focus());
  typingText.addEventListener("click", () => inputField.focus());
}
randomParagraph();

function initTyping(event) {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inputField.value.split("")[charIndex];
  if (charIndex < characters.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    if (typedChar == null) {
      charIndex--;
      if (characters[charIndex].classList.contains("incorrect")) {
        mistakeCount--;
      }
      characters[charIndex].classList.remove("incorrect", "correct");
    } else {
      if (characters[charIndex].innerHTML === typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakeCount++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }
    mistakeTag.innerText = mistakeCount;
    let wpm = Math.round(
      ((charIndex - mistakeCount) / 5 / (maxTime - timeLeft)) * 60
    );

    characters.forEach((ele) => ele.classList.remove("active"));
    characters[charIndex].classList.add("active");
    cpmTag.innerHTML = charIndex - mistakeCount;
    wpmTag.innerHTML = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
  } else {
    inputField.value = "";
    clearInterval(timer);
  }
}

inputField.addEventListener("input", initTyping);

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}
