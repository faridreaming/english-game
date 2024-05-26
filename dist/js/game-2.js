const level = Number(new URLSearchParams(window.location.search).get("level"));
const expReward = level === 1 ? 15 : level === 2 ? 30 : 50;
document.getElementById("exp-span").textContent = expReward;

document.title = `Blank Fit | Level ${level}`;
document.getElementById("logo-span").textContent = `Blank Fit Level ${level}`;
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
  window.location.href = "index.html?category=2";
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
const words = [
  [
    "On a bright and sunny morning, the children decided to go on a fun adventure to the park, where they played on the swings, slid down the slides, and had a wonderful picnic under the shade of the big, old oak tree.",
    "In the middle of the night, when everyone was fast asleep, a gentle breeze rustled the leaves outside the window, creating a soothing sound that made the entire house feel calm and peaceful.",
    "As the school year came to an end, the students were excited to present their final projects, which they had worked on diligently for weeks, showcasing their creativity and hard work to their teachers and parents.",
    "During the long summer vacation, the family decided to take a road trip across the country, visiting various national parks, exploring new cities, and creating unforgettable memories along the way.",
    "With great enthusiasm, the young artist picked up her paintbrush and started to create a beautiful landscape on the canvas, inspired by the picturesque view she had seen during her recent hike in the mountains.",
    "The young boy loved to read adventure books, and every night before bed, his mother would read him a new chapter, transporting him to magical lands full of dragons and heroes.",
    "When the winter snow began to fall, the entire neighborhood came together to build the biggest snowman they had ever seen, complete with a carrot nose and a hat made of an old pot.",
    "Every Sunday afternoon, the family would gather in the kitchen to bake delicious cookies, filling the house with the sweet aroma of chocolate and vanilla.",
    "The little girl eagerly awaited her birthday party, which her parents had planned with lots of games, a big cake, and all her friends from school.",
    "On their trip to the zoo, the children were fascinated by the exotic animals, especially the playful monkeys and the majestic lions, which they watched for hours.",
    "During the autumn season, the park was covered in a blanket of colorful leaves, and the children loved to jump into the piles, laughing and playing until the sun went down.",
    "At the beach, the family spent the entire day building sandcastles, swimming in the ocean, and collecting seashells along the shore, enjoying the warm summer breeze.",
    "The school organized a science fair, where students displayed their innovative experiments and inventions, impressing both their peers and the judges with their creativity.",
    "Every Friday evening, the town square would come alive with a farmers' market, where people could buy fresh produce, handmade crafts, and enjoy live music performances.",
    "On their hike through the forest, the group of friends discovered a hidden waterfall, where they spent the afternoon swimming and taking pictures of the beautiful scenery.",
    "The grandmother told her grandchildren stories of her childhood, sharing memories of the simpler times when she would play outside all day and return home just before dark.",
    "The community center hosted a talent show, giving everyone a chance to showcase their skills, from singing and dancing to magic tricks and comedy routines.",
    "At the local library, the children's section was filled with books of all genres, and the kids would spend hours reading their favorite stories and discovering new ones.",
    "The couple decided to renovate their old house, turning it into their dream home with a lot of hard work, creativity, and some help from their friends and family.",
    "On their camping trip, the family enjoyed roasting marshmallows over the campfire, telling ghost stories, and stargazing under the clear night sky."
  ],
  [
    "Despite the early morning fog that blanketed the city, the dedicated marathon runners gathered at the starting line, eagerly anticipating the challenge that lay ahead.",
    "While exploring the ancient ruins, the archaeologists uncovered a hidden chamber filled with artifacts that provided invaluable insights into the lives of the civilization that once thrived there.",
    "As the sun set over the horizon, casting a golden glow across the landscape, the group of friends sat around the campfire, reminiscing about their shared experiences and making plans for future adventures.",
    "In an effort to improve community relations, the local police department organized a neighborhood outreach program, which included friendly basketball games and educational workshops.",
    "With the deadline for the project rapidly approaching, the team members worked tirelessly, often late into the night, to ensure that every detail was meticulously completed to the highest standard.",
    "After months of anticipation, the grand opening of the new museum finally arrived, featuring an impressive collection of contemporary art that attracted visitors from around the world.",
    "Despite facing numerous challenges along the way, the young entrepreneur managed to build a successful business from the ground up, driven by her passion and determination to make a difference.",
    "During their vacation in the mountains, the family enjoyed a variety of outdoor activities, including hiking through scenic trails, fishing in crystal-clear streams, and camping under the stars.",
    "In the aftermath of the storm, the community came together to rebuild, with neighbors helping each other clear debris, repair homes, and provide support to those who had been most affected.",
    "While studying abroad, the students had the opportunity to immerse themselves in a different culture, learning a new language and gaining a deeper understanding of global perspectives.",
    "Amidst the bustling city streets, the small park provided a tranquil oasis, where people could relax, read a book, or simply enjoy the beauty of nature amidst the urban environment.",
    "As the final notes of the symphony echoed through the concert hall, the audience rose to their feet in a standing ovation, applauding the musicians for their outstanding performance.",
    "With the advent of new technology, industries across the globe are experiencing rapid transformation, leading to innovative solutions and improved efficiencies in various sectors.",
    "Although the journey was long and arduous, the breathtaking views from the mountain summit made every step worthwhile, offering a sense of accomplishment and a new perspective on the world below.",
    "During the holiday season, the town square was transformed into a festive wonderland, complete with twinkling lights, cheerful music, and a bustling market offering seasonal treats and handmade gifts.",
    "In an effort to promote sustainability, the company implemented a series of eco-friendly initiatives, including reducing waste, conserving energy, and sourcing materials from renewable resources.",
    "The novel, with its intricate plot and well-developed characters, captivated readers from the very first page, leading them on a thrilling journey full of unexpected twists and turns.",
    "Throughout the year, the botanical garden hosted a variety of educational programs and special events, attracting visitors of all ages who were eager to learn about the diverse plant species on display.",
    "With the support of dedicated volunteers, the community garden flourished, providing fresh produce for local families and serving as a gathering place for neighbors to connect and collaborate.",
    "In the face of adversity, the resilient team continued to push forward, driven by a shared vision and a commitment to achieving their goals, no matter how difficult the path might be."
  ],
  [
    "Despite the numerous obstacles that had arisen over the course of their ambitious project, the research team, consisting of experts from various disciplines, managed to collaborate effectively, leveraging their diverse skill sets and knowledge to develop innovative solutions that addressed the multifaceted challenges they faced.",
    "As the first rays of dawn pierced through the dense canopy of the rainforest, casting dappled shadows on the forest floor, the expedition team, undeterred by the myriad dangers lurking in the undergrowth, pressed onward, driven by the tantalizing prospect of discovering previously uncharted territories and uncovering species hitherto unknown to science.",
    "In a remarkable display of resilience and adaptability, the fledgling startup, which had initially struggled to gain a foothold in the highly competitive tech industry, successfully pivoted its business model, ultimately securing a lucrative partnership with a major corporation that provided the resources and market access needed for exponential growth.",
    "During the intricate restoration process of the centuries-old cathedral, a team of skilled artisans and historians meticulously examined historical records and utilized advanced technologies to ensure that every aspect of the renovation honored the original architectural integrity and cultural significance of the iconic structure.",
    "While navigating the complex legal and regulatory landscape, the multinational corporation strategically expanded its operations into emerging markets, carefully balancing the pursuit of profit with the imperative to adhere to local laws and ethical standards, thereby fostering sustainable development and long-term success.",
    "Amidst the cacophony of the bustling city, the secluded garden, with its meticulously manicured hedges, vibrant floral displays, and tranquil water features, provided a serene escape for visitors seeking respite from the relentless pace of urban life, allowing them to reconnect with nature and find inner peace.",
    "As the debate over climate change intensified, policymakers, scientists, and activists from around the globe convened at the international summit, engaging in rigorous discussions and negotiations to forge a comprehensive agreement aimed at mitigating the impacts of global warming and fostering a sustainable future for generations to come.",
    "In a poignant exploration of human relationships and the passage of time, the novel's protagonist, reflecting on the bittersweet memories of his youth, grappled with themes of love, loss, and redemption, ultimately coming to terms with the inevitable changes that shape our lives and define our identities.",
    "With the advent of groundbreaking medical advancements, the healthcare industry witnessed a paradigm shift, as cutting-edge technologies and innovative treatments revolutionized patient care, improved outcomes, and extended life expectancy, raising ethical questions and sparking debates about the future of medicine.",
    "As the orchestra began to play the hauntingly beautiful symphony, the conductor, with a deft hand and an unwavering sense of timing, guided the musicians through a complex tapestry of harmonies and rhythms, culminating in a powerful crescendo that left the audience in awe and deeply moved.",
    "During the protracted negotiations that followed the contentious merger proposal, the executive leadership teams of both companies engaged in a delicate dance of compromise and persuasion, ultimately reaching an agreement that promised to deliver substantial value to shareholders while safeguarding the interests of employees and customers.",
    "In the aftermath of the devastating natural disaster, humanitarian organizations mobilized swiftly, deploying resources and personnel to provide emergency relief, rebuild infrastructure, and support the affected communities in their efforts to recover and rebuild their lives with dignity and hope.",
    "As the young scientist meticulously documented her findings, she realized that her groundbreaking research had the potential to challenge long-standing theories and open up new avenues of inquiry, thus contributing significantly to the advancement of knowledge in her field and earning her widespread recognition.",
    "Amid the political turmoil that had gripped the nation, the veteran journalist, renowned for his incisive analysis and fearless reporting, embarked on an investigative journey to uncover the truth behind the scandal, revealing a web of corruption and deceit that reached the highest levels of government.",
    "The grand opening of the state-of-the-art cultural center was a resounding success, drawing luminaries from the worlds of art, literature, and music, who gathered to celebrate the institution's mission to promote creative expression, foster intercultural dialogue, and inspire future generations of artists.",
    "During their epic voyage across the treacherous seas, the intrepid explorers encountered a series of unforeseen challenges, from violent storms and treacherous currents to encounters with enigmatic sea creatures, all of which tested their resolve and pushed them to the limits of human endurance.",
    "In a bold experiment that pushed the boundaries of contemporary art, the avant-garde artist transformed an abandoned industrial space into a living installation, inviting the public to interact with the dynamic environment and reflect on themes of urban decay, rebirth, and the passage of time.",
    "As the seasoned diplomat navigated the intricate web of international relations, he skillfully employed a combination of negotiation, persuasion, and strategic alliances to broker a peace agreement that not only resolved the immediate conflict but also laid the groundwork for long-term stability and cooperation.",
    "Amid the rapid advancements in artificial intelligence, ethical considerations came to the forefront, prompting scientists, ethicists, and policymakers to engage in a profound discourse on the implications of AI on privacy, employment, and the fundamental nature of human existence.",
    "As the curtain fell on the final act of the critically acclaimed play, the audience erupted into thunderous applause, a testament to the actors' masterful performances and the director's visionary interpretation of the classic work, which had breathed new life into its timeless themes."
  ],
];

const randomNumber = Math.floor(Math.random() * words[level - 1].length);
const selectedWord = words[level - 1][randomNumber];
const splittedWord = selectedWord.split(" ");

const blanks = [];
const numBlanks = 3;
for (let i = 0; i < numBlanks; i++) {
  const index = Math.floor(Math.random() * splittedWord.length);
  const answer = words[index];
  blanks.push(answer);
}

document.getElementById("missing-word-span").textContent = blanks.join(" ");
