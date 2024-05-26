const categories = [
  {
    title: "Word Pairs",
    description:
      "Find matching pairs of words. Match each word with its pair to complete the level.",
    primaryColor: "#0ea5e9",
    bgColor: "bg-[#0ea5e9]",
    icon: "dist/img/swap.svg",
  },
  {
    title: "Sentence Shuffle",
    description:
      "Rearrange random sentences into grammatically correct and coherent ones. Slide each sentence piece to complete the puzzle.",
    primaryColor: "#22c55e",
    bgColor: "bg-[#22c55e]",
    icon: "dist/img/shuffle.svg",
  },
  {
    title: "Blank Fit",
    description:
      "Fill in the blanks in sentences with the correct words or phrases. Choose words that fit the context to complete the sentence.",
    primaryColor: "#f59e0b",
    bgColor: "bg-[#f59e0b]",
    icon: "dist/img/blank.svg",
  },
  {
    title: "Error Spot",
    description:
      "Identify and correct grammar errors in given sentences. Spot and correct each error to complete the challenge.",
    primaryColor: "#ef4444",
    bgColor: "bg-[#ef4444]",
    icon: "dist/img/error.svg",
  },
];

const categoryIndex =
  Number(new URLSearchParams(window.location.search).get("category")) || 0;
const selectedCategory = categories[categoryIndex];

// Update page elements with the selected category
document.title = `English Games | ${selectedCategory.title}`;
document.getElementById("category-title-span").textContent =
  selectedCategory.title;
document.getElementById("description-span").textContent =
  selectedCategory.description;
document.getElementById("dashboard").classList.add(selectedCategory.bgColor);

// Set active navigation link and update level buttons
document.querySelectorAll(".nav-link")[categoryIndex].classList.add("active");
document.querySelectorAll(".level-button").forEach((button, level) => {
  button.href = `game-${categoryIndex}.html?level=${level + 1}`;
  button.querySelector("div").classList.add(selectedCategory.bgColor);
  button.querySelector("div div img").src = selectedCategory.icon;
});

// Retrieve and handle total EXP
const totalEXP = localStorage.getItem("totalEXP") || 0;
document.getElementById("total-exp-span").textContent = totalEXP;
