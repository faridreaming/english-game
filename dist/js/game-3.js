const level = Number(new URLSearchParams(window.location.search).get("level"));
const expReward = level === 1 ? 15 : level === 2 ? 30 : 50;
document.getElementById("exp-span").textContent = expReward;

document.title = `Verb 3 Pairs | Level ${level}`;
document.getElementById("logo-span").textContent =
  `Verb 3 Pairs Level ${level}`;
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

document
  .getElementById("confirm-close")
  .addEventListener("click", hideConfirmPopup);

function hideConfirmPopup() {
  const popup = document.getElementById("confirm-popup");
  popup.classList.remove("visible");
  setTimeout(() => popup.classList.add("hidden"), 200);
}

document.getElementById("confirm-yes").addEventListener("click", () => {
  window.location.href = "index.html?category=3";
});

function showGameOverPopup() {
  const popup = document.getElementById("game-over-popup");
  popup.classList.remove("hidden");
  setTimeout(() => popup.classList.add("visible"), 0);
}

document.getElementById("game-over-close").addEventListener("click", () => {
  const popup = document.getElementById("game-over-popup");
  popup.classList.remove("visible");
  setTimeout(() => popup.classList.add("hidden"), 200);
});

document.getElementById("game-over-retry").addEventListener("click", () => {
  window.location.reload();
});

document.getElementById("game-over-quit").addEventListener("click", () => {
  window.location.href = "index.html?category=3";
});

// Game Mechanism
// prettier-ignore
let words = [
  {
    a: [
      "accept", "ask", "bake", "call", "dance", "enjoy", "follow", "guess", "help", "introduce", "join", "kick", "laugh", "move", "notice", "open", "play", "question", "remember", "send", "talk", "use", "visit", "wait", "yell", "arrange", "arrive", "attack", "behave", "believe", "belong", "blame", "borrow", "bother", "clean", "discover", "earn", "explain", "fill", "fix", "gather", "handle", "judge", "keep", "learn", "listen", "manage", "need", "offer", "paint"
    ],
    b: [
      "accepted", "asked", "baked", "called", "danced", "enjoyed", "followed", "guessed", "helped", "introduced", "joined", "kicked", "laughed", "moved", "noticed", "opened", "played", "questioned", "remembered", "sent", "talked", "used", "visited", "waited", "yelled", "arranged", "arrived", "attacked", "behaved", "believed", "belonged", "blamed", "borrowed", "bothered", "cleaned", "discovered", "earned", "explained", "filled", "fixed", "gathered", "handled", "judged", "kept", "learned", "listened", "managed", "needed", "offered", "painted"
    ]
  },
  {
    a: [
      "be", "become", "begin", "bite", "blow", "break", "bring", "build", "burn", "buy", "catch", "choose", "come", "cost", "cut", "do", "draw", "dream", "drink", "drive", "eat", "fall", "feed", "feel", "fight", "find", "fly", "forget", "forgive", "freeze", "get", "give", "go", "grow", "have", "hear", "hide", "hit", "hold", "hurt", "keep", "know", "lay", "lead", "lean", "leave", "lend", "let", "lose"
    ],
    b: [
      "been", "become", "begun", "bitten", "blown", "broken", "brought", "built", "burnt", "bought", "caught", "chosen", "come", "cost", "cut", "done", "drawn", "dreamt", "drunk", "driven", "eaten", "fallen", "fed", "felt", "fought", "found", "flown", "forgotten", "forgiven", "frozen", "got", "given", "gone", "grown", "had", "heard", "hidden", "hit", "held", "hurt", "kept", "known", "laid", "led", "leant", "left", "lent", "let", "lost"
    ]
  },
  {
    a: [
      "arise", "awake", "bear", "behold", "bind", "breed", "cast", "cling", "creep", "deal", "dig", "dwell", "flee", "fling", "grind", "hang", "knit", "leap", "mow", "overcome", "plead", "prove", "ride", "ring", "rise", "saw", "seek", "sew", "shake", "shave", "shear", "shed", "shrink", "shut", "slay", "slink", "smite", "sow", "spin", "spit", "split", "spread", "spring", "stick", "sting", "stink", "stride", "strike", "string"
    ],
    b: [
      "arisen", "awoken", "borne", "beheld", "bound", "bred", "cast", "clung", "crept", "dealt", "dug", "dwelt", "fled", "flung", "ground", "hung", "knit", "leapt", "mown", "overcome", "pled", "proven", "ridden", "rung", "risen", "sawn", "sought", "sewn", "shaken", "shaven", "shorn", "shed", "shrunk", "shut", "slain", "slunk", "smitten", "sown", "spun", "spat", "split", "spread", "sprung", "stuck", "stung", "stunk", "stridden", "struck", "strung"
    ]
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
