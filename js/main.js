const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".input-field");
const mistakeTag = document.querySelector(".mistake span");
const timeTag = document.querySelector(".time span b");

let charIndex = 0;
let mistakeCount = 0;

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

// typingText.querySelector("span").classList.add("active");
function initTyping(event) {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inputField.value.split("")[charIndex];
  console.log(typedChar);
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
  characters.forEach((ele) => ele.classList.remove("active"));
  characters[charIndex].classList.add("active");
}

inputField.addEventListener("input", initTyping);
