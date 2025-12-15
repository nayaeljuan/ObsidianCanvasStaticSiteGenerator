// Récupère toutes les sections avec une classe spécifique
const sections = document.querySelectorAll(".mes-premieres-experiences-md, .la-cassette-audio-md, .chasse-au-tresor-md");

sections.forEach((section, index) => {
  const paragraphs = section.querySelectorAll(".content p");
  paragraphs.forEach(p => p.style.display = "none");

  const bouton = document.createElement("button");
  bouton.textContent = `lire`;
  bouton.classList.add("btn-lire"); // ← AJOUT DE LA CLASSE
  section.insertBefore(bouton, section.querySelector(".content"));

  bouton.addEventListener("click", () => {
    const isHidden = paragraphs[0].style.display === "none";
    paragraphs.forEach(p => p.style.display = isHidden ? "block" : "none");
    bouton.textContent = isHidden ? `X` : `lire`;
  });
});
