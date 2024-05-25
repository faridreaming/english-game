const categorySpan = document.getElementById("category-span");
const category = new URLSearchParams(window.location.search).get("category") || "grammar";
categorySpan.textContent = category.charAt(0).toUpperCase() + category.slice(1);

const navLinks = document.querySelectorAll("nav .nav-link");
const levelContainer = document.getElementById("level-container");

const generateLevel = (totalLevel, category) => {
  let level = "";
  for (let i = 1; i <= totalLevel; i++) {
    level += `
      <div class="flex justify-center flex-col items-center">
        <a href="game.html?category=${category}&level=${i}" class="bg-secondary hover:bg-opacity-80 flex items-center justify-center h-16 aspect-square rounded-full text-3xl font-bold text-white ring-[6px] ring-slate-300 transition duration-200 ease-in-out"><span class="drop-shadow">${i}</span></a>
        ${i === totalLevel ? "" : `<div class="w-1 h-20 bg-slate-300"></div>`}
      </div>
    `;
  }
  return level;
};

// document.addEventListener("DOMContentLoaded", () => {
switch (category) {
  case "grammar":
    navLinks[0].classList.add("active");
    levelContainer.innerHTML = generateLevel(5, "grammar");
    break;
  case "vocabulary":
    navLinks[1].classList.add("active");
    break;
  case "reading":
    navLinks[2].classList.add("active");
    break;
}
// });
