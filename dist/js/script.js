const categorySpan = document.getElementById("category-span");
const category = new URLSearchParams(window.location.search).get("category") || "grammar";
categorySpan.textContent = category.charAt(0).toUpperCase() + category.slice(1);

const navLinks = document.querySelectorAll("nav .nav-link");

const chapterContainer = document.getElementById("chapter-container");

const categoryList = [
  {
    title: "Grammar",
    chapters: ["Adjective Game", "Verb Game", "Adverb Game", "Noun Game"],
  },
];

let icon = "";
let colorPrimary = "";

switch (category) {
  case "grammar":
    navLinks[0].classList.add("active");
    icon = navLinks[0].querySelector("div svg");
    colorPrimary = "#06b6d44b";
    textColor = "text-[#06b6d4]";
    bgColor = "bg-[#06b6d4]";
    borderColor = "border-[#06b6d4]/35";
    chapterContainer.innerHTML = generateChapter(categoryList[0]);
    break;
  case "vocabulary":
    navLinks[1].classList.add("active");
    icon = navLinks[1].querySelector("div svg");
    colorPrimary = "#eab3084b";
    textColor = "text-[#eab308]";
    bgColor = "bg-[#eab308]";
    borderColor = "border-[#eab308]/35";
    break;
  case "reading":
    navLinks[2].classList.add("active");
    icon = navLinks[2].querySelector("div svg");
    colorPrimary = "#10b9814b";
    textColor = "text-[#10b981]";
    bgColor = "bg-[#10b981]";
    borderColor = "border-[#10b981]/35";
    break;
}

const topBar = document.getElementById("top-bar");
topBar.classList.add(bgColor);

function generateChapter(category) {
  const chapters = category.chapters;
  let chapterList = "";
  chapters.forEach((chapter, number) => {
    chapterList += `
      <div class="px-8 w-full">
        <a href="game.html?category=${category.title.toLowerCase()}&chapter=${number}&level=1" class="flex hover:bg-gray/10 transition duration-200 ease-in-out border-2 border-gray/35 border-b-4 px-4 py-12 overflow-hidden rounded-2xl relative">
          <div class="absolute right-0 -z-10 scale-[3] translate-y-5 -translate-x-6 [&>svg]:fill-white ${bgColor} opacity-50 p-1 rounded -rotate-3">
            ${icon.outerHTML}
          </div>
          <div class="flex flex-col items-start">
            <h2 class="text-2xl font-bold ${textColor}">${chapter}</h2>
            <p class="text-gray/70">Chapter ${number + 1}</p>
          </div>
        </a>
      </div>
    `;
  });
  return chapterList;
}
