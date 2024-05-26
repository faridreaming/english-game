const level = Number(new URLSearchParams(window.location.search).get("level"));
const expReward = level === 1 ? 15 : level === 2 ? 30 : 50;
document.getElementById("exp-span").textContent = expReward;

document.title = `Synonym Pairs | Level ${level}`;
document.getElementById("logo-span").textContent =
  `Synonym Pairs Level ${level}`;
document
  .getElementById("back-button")
  .addEventListener("click", showConfirmPopup);

function showConfirmPopup() {
  const popup = document.getElementById("confirm-popup");
  popup.classList.remove("hidden");
  setTimeout(() => popup.classList.add("visible"), 0);
}

document
  .getElementById("confirm-no")
  .addEventListener("click", hideConfirmPopup);

function hideConfirmPopup() {
  const popup = document.getElementById("confirm-popup");
  popup.classList.remove("visible");
  setTimeout(() => popup.classList.add("hidden"), 200);
}

document.getElementById("confirm-yes").addEventListener("click", () => {
  window.location.href = "index.html?category=1";
});

function showGameOverPopup() {
  const popup = document.getElementById("game-over-popup");
  popup.classList.remove("hidden");
  setTimeout(() => popup.classList.add("visible"), 0);
  console.log("game over");
}

document.getElementById("game-over-retry").addEventListener("click", () => {
  window.location.reload();
});

document.getElementById("game-over-quit").addEventListener("click", () => {
  window.location.href = "index.html?category=1";
});

// Game Mechanism
// prettier-ignore
let words = [
  {
    a: ["big", "happy", "fast", "hot", "small", "sad", "tired", "old", "new", "pretty", "angry", "funny", "quiet", "loud", "hard", "soft", "strong", "weak", "young", "old", "smart", "easy", "difficult", "beautiful", "ugly"],
    b: ["large", "glad", "quick", "warm", "little", "unhappy", "sleepy", "elderly", "modern", "attractive", "furious", "amusing", "silent", "noisy", "difficult", "gentle", "powerful", "fragile", "youthful", "aged", "intelligent", "simple", "challenging", "attractive", "unattractive"]    
  },
  {
    a: ["brave", "clever", "confident", "generous", "persistent", "precise", "reckless", "sensible", "significant", "sincere", "sophisticated", "stubborn", "tempting", "transparent", "vague", "vivid", "wise", "arrogant", "capable", "curious", "deceitful", "determined", "diligent", "discreet", "eager"],
    b: ["courageous", "intelligent", "assured", "bountiful", "tenacious", "accurate", "audacious", "prudent", "substantial", "earnest", "complex", "obstinate", "alluring", "clear", "ambiguous", "lively", "knowledgeable", "haughty", "competent", "inquisitive", "deceptive", "resolute", "conscientious", "cautious", "enthusiastic"]    
  },
  {
    a: ["abundant", "ambiguous", "anxious", "candid", "confident", "controversial", "diligent", "elaborate", "eloquent", "erratic", "essential", "exquisite", "extravagant", "inquisitive", "notorious", "meticulous", "obscure", "persistent", "prosperous", "resilient", "scrutinize", "sophisticated", "superficial", "tedious", "volatile"],
    b: ["plentiful", "vague", "worried", "frank", "assured", "contentious", "conscientious", "detailed", "articulate", "unpredictable", "vital", "beautiful", "lavish", "curious", "infamous", "precise", "obscure", "tenacious", "successful", "flexible", "examine closely", "complex", "shallow", "boring", "unstable"]        
  }
];

const selectedWord = [[], []];
const usedRandomNumbers = new Set();
const wordListA = words[level - 1].a;
const wordListB = words[level - 1].b;
const wordListLength = wordListA.length;

for (let i = 0; i < 7; i++) {
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * wordListLength);
  } while (usedRandomNumbers.has(randomNumber));
  usedRandomNumbers.add(randomNumber);
  selectedWord[0].push(wordListA[randomNumber]);
  selectedWord[1].push(wordListB[randomNumber]);
}

const pairAShuffled = [...selectedWord[0]];
const pairBShuffled = [...selectedWord[1]];
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
shuffleArray(pairAShuffled);
shuffleArray(pairBShuffled);

const pairASpans = document.querySelectorAll("#pair-a div span");
pairASpans.forEach((span, index) => {
  const word = pairAShuffled[index];
  span.textContent = word.charAt(0).toUpperCase() + word.slice(1);
});

const pairBSpans = document.querySelectorAll("#pair-b div span");
pairBSpans.forEach((span, index) => {
  const word = pairBShuffled[index];
  span.textContent = word.charAt(0).toUpperCase() + word.slice(1);
});

const pairA = document.querySelectorAll("#pair-a div");
const pairB = document.querySelectorAll("#pair-b div");

let correctTotal = 0;
let selectedPair = [];
const checkMatch = () => {
  if (selectedPair.length === 2) {
    const [wordA, wordB] = selectedPair;
    if (wordA && wordB) {
      const indexA = selectedWord[0].indexOf(wordA);
      const indexB = selectedWord[1].indexOf(wordB);
      if (indexA === indexB) {
        pairA.forEach((div) => {
          if (div.classList.contains("pair-a-selected"))
            div.classList.add("pair-a-correct");
          div.classList.remove("pair-a-selected");
        });
        pairB.forEach((div) => {
          if (div.classList.contains("pair-b-selected"))
            div.classList.add("pair-b-correct");
          div.classList.remove("pair-b-selected");
        });
        correctTotal++;
        if (correctTotal === 7) {
          showGameOverPopup();
          const totalEXP = localStorage.getItem("totalEXP") || 0;
          localStorage.setItem("totalEXP", Number(totalEXP) + expReward);
        }
      } else {
        pairA.forEach((div) => {
          if (div.classList.contains("pair-a-selected")) {
            div.classList.add("pair-incorrect");
            div.classList.remove("pair-a-selected");
          }
        });
        pairB.forEach((div) => {
          if (div.classList.contains("pair-b-selected")) {
            div.classList.add("pair-incorrect");
            div.classList.remove("pair-b-selected");
          }
        });
      }
      selectedPair = [];
      setTimeout(() => {
        pairA.forEach((div) => {
          div.classList.remove("pair-incorrect");
        });
        pairB.forEach((div) => {
          div.classList.remove("pair-incorrect");
        });
      }, 300);
    }
  }
};

pairA.forEach((div) => {
  div.addEventListener("click", () => {
    pairA.forEach((e) => e.classList.remove("pair-a-selected"));
    div.classList.add("pair-a-selected");
    selectedPair[0] = pairAShuffled[Array.from(pairA).indexOf(div)];
    checkMatch();
  });
});

pairB.forEach((div) => {
  div.addEventListener("click", () => {
    pairB.forEach((e) => e.classList.remove("pair-b-selected"));
    div.classList.add("pair-b-selected");
    selectedPair[1] = pairBShuffled[Array.from(pairB).indexOf(div)];
    checkMatch();
  });
});
