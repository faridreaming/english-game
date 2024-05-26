const categories = [
  {
    title: "Word Pairs",
    description: "Find matching pairs of words. Match each word with its pair to complete the level.",
    primaryColor: "#0ea5e9",
    bgColor: "bg-[#0ea5e9]",
  },
  {
    title: "Sentence Shuffle",
    description:
      "Rearrange random sentences into grammatically correct and coherent ones. Slide each sentence piece to complete the puzzle.",
    primaryColor: "#22c55e",
    bgColor: "bg-[#22c55e]",
  },
  {
    title: "Blank Fit",
    description:
      "Fill in the blanks in sentences with the correct words or phrases. Choose words that fit the context to complete the sentence.",
    primaryColor: "#f59e0b",
    bgColor: "bg-[#f59e0b]",
  },
  {
    title: "Error Spot",
    description:
      "Identify and correct grammar errors in given sentences. Spot and correct each error to complete the challenge.",
    primaryColor: "#ef4444",
    bgColor: "bg-[#ef4444]",
  },
];

const category = Number(new URLSearchParams(window.location.search).get("category")) || 0;
const { title: categoryTitle, description, primaryColor, bgColor } = categories[category];

// Implementing the category handle
document.title = "Grammar Games | " + categoryTitle;
document.getElementById("category-title-span").textContent = categoryTitle;
document.getElementById("description-span").textContent = description;
document.getElementById("dashboard").classList.add(bgColor);
document.querySelectorAll(".nav-link")[category].classList.add("active");
