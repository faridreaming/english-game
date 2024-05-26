const level = Number(new URLSearchParams(window.location.search).get("level"));

document.title = `Word Pairs | Level ${level}`;
document.getElementById("logo-span").textContent = `Word Pairs Level ${level}`;
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
  window.location.href = "index.html?category=0";
});

// Game Mechanism
// prettier-ignore
let words = [
  {
    a: ["apple", "banana", "cat", "dog", "elephant", "fish", "goat", "hat", "ice cream", "jacket", "kite", "lion", "monkey", "notebook", "orange", "pizza", "queen", "rabbit", "sun", "table", "umbrella", "van", "watermelon", "xylophone", "yacht", "zebra", "ant", "bird", "carrot", "dolphin", "egg", "frog", "guitar", "hammer", "ink", "jellyfish", "kangaroo", "lemon", "mango", "nest", "octopus", "penguin", "quail", "rose", "snake", "tiger", "unicorn", "violin", "whale", "xylophone"],
    b: ["apel", "pisang", "kucing", "anjing", "gajah", "ikan", "kambing", "topi", "es krim", "jaket", "layang-layang", "singa", "monyet", "buku catatan", "jeruk", "pizza", "ratu", "kelinci", "matahari", "meja", "payung", "van", "semangka", "xylophone", "yacht", "zebra", "semut", "burung", "wortel", "lumba-lumba", "telur", "katak", "gitar", "palu", "tinta", "ubur-ubur", "kanguru", "lemon", "mangga", "sarang", "gurita", "penguin", "burung puyuh", "mawar", "ular", "harimau", "unicorn", "biola", "paus", "xylophone"]    
  },
  {
    a: ["architecture", "bilingual", "curiosity", "destination", "entrepreneur", "flexibility", "gratitude", "hospitality", "innovation", "journalism", "knowledge", "laboratory", "multicultural", "negotiation", "opportunity", "philosophy", "qualification", "responsibility", "sustainability", "technology", "university", "volunteer", "wildlife", "xylophone", "yield", "zeal", "abundant", "brilliant", "collaboration", "determination", "empowerment", "fascinating", "globalization", "harmony", "integrity", "leadership", "motivation", "nurture", "optimistic", "perseverance", "quality", "resilience", "strategy", "transformation", "unique", "vibrant", "wisdom", "youthful", "zealous"],
    b: ["arsitektur", "bilingual", "rasa ingin tahu", "tujuan", "entrepreneur", "fleksibilitas", "gratifikasi", "keramahan", "inovasi", "jurnalisme", "pengetahuan", "laboratorium", "multikultural", "negosiasi", "kesempatan", "filosofi", "kualifikasi", "tanggung jawab", "keberlanjutan", "teknologi", "universitas", "sukarelawan", "kehidupan liar", "xylophone", "hasil", "semangat", "berlimpah", "brilian", "kolaborasi", "determinasi", "pemberdayaan", "menarik", "globalisasi", "harmoni", "integritas", "kepemimpinan", "motivasi", "pengasuhan", "optimisme", "ketekunan", "kualitas", "ketahanan", "strategi", "transformasi", "unik", "bersemangat", "kebijaksanaan", "muda", "bersemangat"]
  },
  {
    a: ["anomaly", "benevolent", "cacophony", "deleterious", "ebullient", "facetious", "gregarious", "hedonistic", "idiosyncrasy", "juxtaposition", "kaleidoscope", "labyrinth", "magnanimous", "nepotism", "obfuscate", "paradox", "quixotic", "recalcitrant", "serendipity", "tantamount", "ubiquitous", "vexatious", "whimsical", "xenophobia", "yearning", "zenith", "alacrity", "belligerent", "capitulate", "denouement", "effervescent", "fortuitous", "garrulous", "hierarchy", "iconoclast", "jettison", "kowtow", "luminous", "mellifluous", "nonchalant", "ostentatious", "perfunctory", "quintessential", "rhetoric", "sycophant", "trepidation", "usurp", "veracity", "wanton"],
    b: ["anomali", "baik hati", "keributan", "merugikan", "ceria", "bercanda", "ramah", "hedonistik", "keanehan", "juxtaposisi", "kaleidoskop", "labirin", "besar hati", "nepotisme", "membingungkan", "paradox", "aneh", "keras kepala", "kebetulan menyenangkan", "setara dengan", "sering ditemui", "meresahkan", "eksentrik", "fobia terhadap orang asing", "kerinduan", "puncak", "sigap", "belligerent", "menyerah", "puncak cerita", "bergemuruh", "kebetulan", "bercakap-cakap", "hirarki", "ikonoklastik", "membuang", "tunduk", "bersinar", "melodius", "santai", "mewah", "ceroboh", "paling utama", "retorika", "pengikut", "ketakutan", "menguasai", "kebenaran", "nakal"]    
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

let correctTotal = 6;
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
        console.log(correctTotal);
        if (correctTotal === 7) {
          showGameOverPopup();
        }
      } else {
        pairA.forEach((div) => {
          if (div.classList.contains("pair-a-selected"))
            div.classList.add("pair-incorrect");
        });
        pairB.forEach((div) => {
          if (div.classList.contains("pair-b-selected"))
            div.classList.add("pair-incorrect");
        });
      }
      selectedPair = [];
      setTimeout(() => {
        pairA.forEach((div) => {
          div.classList.remove("pair-a-selected");
          div.classList.remove("pair-incorrect");
        });
        pairB.forEach((div) => {
          div.classList.remove("pair-b-selected");
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
  window.location.href = "index.html?category=0";
});
