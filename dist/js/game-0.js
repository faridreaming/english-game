const level = Number(new URLSearchParams(window.location.search).get("level"));
const expReward = level === 1 ? 15 : level === 2 ? 30 : 50;
document.getElementById("exp-span").textContent = expReward;

document.title = `Translation Pairs | Level ${level}`;
document.getElementById("logo-span").textContent =
  `Translation Pairs Level ${level}`;
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
  window.location.href = "index.html?category=0";
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
  window.location.href = "index.html?category=0";
});

// Game Mechanism
// prettier-ignore
let words = [
  {
    a: [
      "hello", "goodbye", "please", "thank you", "yes", "no", "excuse me", "sorry", "help", "stop",
      "go", "come", "wait", "listen", "speak", "write", "read", "walk", "run", "drive",
      "eat", "drink", "sleep", "wake", "play", "work", "study", "shop", "cook", "clean",
      "laugh", "cry", "smile", "angry", "happy", "sad", "big", "small", "hot", "cold",
      "fast", "slow", "new", "old", "good", "bad", "light", "heavy", "hard", "easy"
    ],
    b: [
      "halo", "selamat tinggal", "tolong", "terima kasih", "ya", "tidak", "permisi", "maaf", "bantu", "berhenti",
      "pergi", "datang", "tunggu", "dengar", "bicara", "tulis", "baca", "jalan", "lari", "mengemudi",
      "makan", "minum", "tidur", "bangun", "main", "kerja", "belajar", "belanja", "masak", "bersih",
      "tertawa", "menangis", "senyum", "marah", "bahagia", "sedih", "besar", "kecil", "panas", "dingin",
      "cepat", "lambat", "baru", "lama", "bagus", "buruk", "ringan", "berat", "keras", "mudah"
    ]   
  },
  {
    a: [
      "achievement", "adapt", "advocate", "ambiguous", "analyze", "annotate", "anticipate", "apparent", "arbitrary", "assert",
      "assess", "assume", "authorize", "bias", "capacity", "cite", "clarify", "complement", "comply", "compose",
      "comprehensive", "conceive", "concurrent", "conduct", "conflict", "consent", "constrain", "controversy", "convene", "coordinate",
      "correlate", "criteria", "deduce", "demonstrate", "denote", "depress", "derive", "designate", "detect", "deviate",
      "differentiate", "diminish", "discrete", "discriminate", "displace", "display", "dispose", "distinct", "dominate", "emphasis"
    ],
    b: [
      "prestasi", "menyesuaikan", "menganjurkan", "samar", "menganalisis", "mengomentari", "mengantisipasi", "jelas", "sewenang-wenang", "menegaskan",
      "menilai", "menganggap", "memberi wewenang", "praduga", "kapasitas", "mengutip", "memperjelas", "melengkapi", "mematuhi", "mengarang",
      "komprehensif", "membayangkan", "bersamaan", "melakukan", "konflik", "persetujuan", "membatasi", "kontroversi", "berkumpul", "koordinasi",
      "berkorelasi", "kriteria", "menarik kesimpulan", "menunjukkan", "menandakan", "menekan", "memperoleh", "menunjuk", "mendeteksi", "menyimpang",
      "membedakan", "mengurangi", "terpisah", "membeda-bedakan", "menggantikan", "menampilkan", "memusnahkan", "berbeda", "mendominasi", "penekanan"
    ]  
  },
  {
    a: [
      "articulate", "comprehend", "synthesize", "enhance", "innovate", "navigate", "negotiate", "persuade", "prioritize", "refine",
      "simplify", "sustain", "transform", "utilize", "validate", "visualize", "advocate", "collaborate", "conceptualize", "cultivate",
      "devise", "diagnose", "differentiate", "facilitate", "illustrate", "integrate", "mediate", "mitigate", "mobilize", "modulate",
      "optimize", "orchestrate", "parallel", "perpetuate", "reconcile", "reconstruct", "reiterate", "replicate", "synthesize", "theorize"
    ],
    b: [
      "artikulasi", "memahami", "mensintesis", "meningkatkan", "berinovasi", "menavigasi", "menegosiasi", "meyakinkan", "memprioritaskan", "menyempurnakan",
      "mempermudah", "mempertahankan", "mentransformasi", "menggunakan", "memvalidasi", "memvisualisasikan", "menganjurkan", "berkolaborasi", "mengkonseptualisasikan", "mengembangkan",
      "merancang", "mendiagnosis", "membedakan", "memfasilitasi", "mengilustrasikan", "mengintegrasikan", "memediasi", "meringankan", "memobilisasi", "memodulasi",
      "mengoptimalkan", "mengorkestrasi", "sejajar", "mempertahankan", "mendamaikan", "merekonstruksi", "mengulangi", "mereplikasi", "mensintesis", "membuat teori"
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
