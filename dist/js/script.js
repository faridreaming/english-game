const categories = [
  {
    title: "Translation",
    description: "Find pairs of words with suitable translations.",
    primaryColor: "#0ea5e9",
    bgColor: "bg-[#0ea5e9]",
    icon: "dist/img/swap.svg",
  },
  {
    title: "Synonim",
    description: "Find pairs of words with the same meaning.",
    primaryColor: "#22c55e",
    bgColor: "bg-[#22c55e]",
    icon: "dist/img/equal.svg",
  },
  {
    title: "Antonym",
    description: "Find pairs of words with opposite meanings.",
    primaryColor: "#f59e0b",
    bgColor: "bg-[#f59e0b]",
    icon: "dist/img/switch.svg",
  },
];

const categoryIndex =
  Number(new URLSearchParams(window.location.search).get("category")) || 0;
const selectedCategory = categories[categoryIndex];

// Update page elements with the selected category
document.title = `Word Matching Games | ${selectedCategory.title}`;
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
const totalExpSpan = document.getElementById("total-exp-span");
const resetExpButton = document.getElementById("reset-exp-button");

const totalEXP = localStorage.getItem("totalEXP") || 0;
totalExpSpan.textContent = totalEXP;

totalExpSpan.addEventListener("click", () => {
  resetExpButton.classList.toggle("opacity-0");
  resetExpButton.classList.toggle("pointer-events-none");
});

resetExpButton.addEventListener("click", showConfirmPopup);

document.getElementById("confirm-yes").addEventListener("click", () => {
  localStorage.setItem("totalEXP", 0);
  totalExpSpan.textContent = 0;
  resetExpButton.classList.toggle("opacity-0");
  resetExpButton.classList.toggle("pointer-events-none");
  hideConfirmPopup();
});

document.getElementById("confirm-no").addEventListener("click", () => {
  resetExpButton.classList.toggle("opacity-0");
  resetExpButton.classList.toggle("pointer-events-none");
  hideConfirmPopup();
});

document
  .getElementById("confirm-close")
  .addEventListener("click", hideConfirmPopup);

function showConfirmPopup() {
  const popup = document.getElementById("confirm-popup");
  popup.classList.remove("hidden");
  setTimeout(() => popup.classList.add("visible"), 0);
}

function hideConfirmPopup() {
  const popup = document.getElementById("confirm-popup");
  popup.classList.remove("visible");
  setTimeout(() => popup.classList.add("hidden"), 200);
}
