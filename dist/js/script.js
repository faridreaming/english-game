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

switch (category) {
  case "grammar":
    navLinks[0].classList.add("active");
    icon = navLinks[0].querySelector("div svg");
    primaryColor = "sky-500";
    chapterContainer.innerHTML = generateChapter(categoryList[0]);
    break;
  case "vocabulary":
    navLinks[1].classList.add("active");
    icon = navLinks[1].querySelector("div svg");
    primaryColor = "yellow-500";
    break;
  case "reading":
    navLinks[2].classList.add("active");
    icon = navLinks[2].querySelector("div svg");
    primaryColor = "emerald-500";
    break;
}

const topBar = document.getElementById("top-bar");
topBar.classList.add(`bg-${primaryColor}`);

function generateChapter(category) {
  const chapters = category.chapters;
  let chapterList = "";
  chapters.forEach((chapter, number) => {
    chapterList += `
      <div class="px-8 w-full">
        <div class="bg-${primaryColor} bg-opacity-10 border border-${primaryColor} px-4 py-16 rounded-2xl">
          <div class="flex justify-center">
            <h3 class="text-center"><span class="font-bold">Chapter ${number + 1}:</span> ${chapter}</h3>
          </div>
        </div>
      </div>
    `;
  });
  return chapterList;
}
