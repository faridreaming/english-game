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
  console.log("game over");
}

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
    a: ["hello", "goodbye", "please", "thank you", "sorry", "yes", "no", "excuse me", "help", "sorry", "happy", "sad", "angry", "love", "friend", "family", "teacher", "student", "school", "work", "play", "eat", "drink", "sleep", "wake up", "morning", "afternoon", "evening", "night", "today", "tomorrow", "yesterday", "week", "month", "year", "time", "money", "home", "food", "water", "book", "computer", "phone", "internet", "music", "movie", "game", "sport"],
    b: ["halo", "selamat tinggal", "tolong", "terima kasih", "maaf", "ya", "tidak", "permisi", "bantuan", "maaf", "bahagia", "sedih", "marah", "cinta", "teman", "keluarga", "guru", "siswa", "sekolah", "kerja", "bermain", "makan", "minum", "tidur", "bangun", "pagi", "siang", "sore", "malam", "hari ini", "besok", "kemarin", "minggu", "bulan", "tahun", "waktu", "uang", "rumah", "makanan", "air", "buku", "komputer", "telepon", "internet", "musik", "film", "permainan", "olahraga"]     
  },
  {
    a: ["weather", "climate", "environment", "global warming", "pollution", "recycle", "sustainability", "renewable energy", "technology", "innovation", "education", "knowledge", "communication", "conversation", "discussion", "debate", "argument", "solution", "challenge", "opportunity", "experience", "adventure", "journey", "discovery", "achievement", "success", "failure", "progress", "development", "improvement", "change", "transformation", "growth", "decision", "responsibility", "accountability", "leadership", "organization", "management", "efficiency", "productivity", "creativity", "imagination", "strategy", "tactics", "goal", "objective", "ambition", "motivation"],
    b: ["cuaca", "iklim", "lingkungan", "pemanasan global", "polusi", "daur ulang", "keberlanjutan", "energi terbarukan", "teknologi", "inovasi", "pendidikan", "pengetahuan", "komunikasi", "percakapan", "diskusi", "debat", "argumen", "solusi", "tantangan", "kesempatan", "pengalaman", "petualangan", "perjalanan", "penemuan", "prestasi", "kesuksesan", "kegagalan", "kemajuan", "pengembangan", "perbaikan", "perubahan", "transformasi", "pertumbuhan", "keputusan", "tanggung jawab", "akuntabilitas", "kepemimpinan", "organisasi", "manajemen", "efisiensi", "produktivitas", "kreativitas", "imaginasi", "strategi", "taktik", "tujuan", "obyektif", "ambisi", "motivasi"]    
  },
  {
    a: ["abundant", "ambiguous", "analogous", "apprehensive", "astonishing", "benevolent", "candid", "comprehensive", "conscientious", "controversial", "cumbersome", "diligent", "elaborate", "elusive", "exemplary", "expedite", "fluctuate", "gratuitous", "haphazard", "imminent", "inadvertent", "inquisitive", "insidious", "integral", "intricate", "irresolute", "lucrative", "meticulous", "nuanced", "obsolete", "paradoxical", "perfunctory", "precarious", "prolific", "prosperous", "punctual", "redundant", "reputable", "resilient", "resolute", "scrutinize", "sporadic", "strenuous", "substantial", "superfluous", "tenacious", "transient", "ubiquitous"],
    b: ["melimpah", "ambigu", "analog", "cemas", "menakjubkan", "dermawan", "terbuka", "komprehensif", "teliti", "kontroversial", "rumit", "gigih", "rinci", "sulit ditangkap", "teladan", "mempercepat", "fluktuatif", "gratis", "sembarangan", "segera", "tidak disengaja", "penasaran", "sia-sia", "integral", "rumit", "ragu-ragu", "menguntungkan", "teliti", "bernuansa", "usang", "paradoks", "cepat-cepat", "berbahaya", "prolifik", "makmur", "tepat waktu", "berlebihan", "terkenal", "teguh", "tegas", "memeriksa dengan teliti", "sporadis", "berat", "substansial", "berlebihan", "teguh", "sementara", "serba ada"]       
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
