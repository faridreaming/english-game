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

document
  .getElementById("confirm-close")
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
  window.location.href = "index.html?category=1";
});

// Game Mechanism
// prettier-ignore
let words = [
  {
    a: [
      "happy", "sad", "fast", "slow", "hot", "cold", "hard", "easy", "big", "small",
      "old", "new", "good", "bad", "high", "low", "rich", "poor", "smart", "dumb",
      "strong", "weak", "light", "heavy", "near", "far", "early", "late", "clean", "dirty",
      "long", "short", "right", "wrong", "loud", "quiet", "bright", "dark", "sharp", "dull",
      "smooth", "rough", "tight", "loose", "wet", "dry", "thick", "thin", "soft", "hard"
    ],
    b: [
      "joyful", "unhappy", "quick", "leisurely", "warm", "chilly", "difficult", "simple", "large", "tiny",
      "ancient", "modern", "excellent", "terrible", "tall", "deep", "wealthy", "needy", "intelligent", "silly",
      "powerful", "frail", "illuminated", "weighty", "close", "distant", "prompt", "delayed", "spotless", "filthy",
      "extended", "brief", "correct", "incorrect", "noisy", "silent", "luminous", "gloomy", "keen", "blunt",
      "silky", "coarse", "snug", "slack", "damp", "arid", "bulky", "slender", "tender", "firm"
    ]
  },
  {
    a: [
      "average", "central", "common", "fair", "intermediary", "intervening", "mean", "median", "medium", "middling",
      "moderate", "neutral", "normal", "standard", "typical", "adequate", "conventional", "routine", "usual", "commonplace",
      "tolerable", "passable", "popular", "reasonable", "modest", "intermediate", "middle", "mid", "midway", "mediate",
      "negotiate", "arbitrate", "moderate", "conciliate", "halfway", "in-between", "inner", "grey", "innermost", "borderline",
      "gray", "inmost", "betwixt and between", "buffer", "negotiator", "broker", "liaison", "ambassador", "honest broker", "middleman"
    ],
    b: [
      "typical", "main", "widespread", "equitable", "go-between", "occurring", "central", "core", "intermediate", "average",
      "balanced", "impartial", "customary", "regular", "habitual", "sufficient", "traditional", "everyday", "common", "ordinary",
      "acceptable", "satisfactory", "favored", "sensible", "moderate", "transitional", "midpoint", "centre", "halfway", "go-between",
      "discuss", "settle", "temper", "reconcile", "central", "middle", "internal", "unclear", "closest", "marginal",
      "vague", "deepest", "between", "intermediary", "mediator", "agent", "representative", "delegate", "peacemaker", "facilitator"
    ]   
  },
  {
    a: [
      "construe", "peruse", "condone", "latent", "acrimonious", "indubitable", "propitious", "tremulous", "masquerade", "salient",
      "embroil", "languish", "aspersion", "sedulous", "pertinacious", "encumber", "obfuscate", "vindicate", "stymie", "recalcitrant",
      "pulchritude", "grandiloquent", "unfettered", "quintessential", "surreptitious", "incontrovertible", "pugnacious", "insidious", "ubiquitous", "vicissitude",
      "prognosticate", "serendipity", "ephemeral", "loquacious", "disparate", "ameliorate", "circumvent", "prevaricate", "demagogue", "enigmatic",
      "autonomy", "benevolent", "cognizant", "dichotomy", "equivocate", "facetious", "gregarious", "heuristic", "iconoclast", "juxtapose"
    ],
    b: [
      "interpret", "examine", "overlook", "dormant", "bitter", "undeniable", "favorable", "shaking", "pretend", "prominent",
      "involve", "weaken", "slander", "diligent", "stubborn", "hinder", "confuse", "justify", "thwart", "defiant",
      "beauty", "bombastic", "liberated", "perfect", "clandestine", "undeniable", "combative", "treacherous", "omnipresent", "change",
      "predict", "luck", "transitory", "talkative", "different", "improve", "bypass", "lie", "agitator", "mysterious",
      "independence", "kind", "aware", "contrast", "mislead", "joking", "social", "exploratory", "rebel", "compare"
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
