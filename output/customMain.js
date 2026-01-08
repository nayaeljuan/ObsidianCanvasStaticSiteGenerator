// Récupère toutes les sections concernées
const sections = document.querySelectorAll(
  ".mes-premieres-experiences-md, .la-cassette-audio-md, .chasse-au-tresor-md"
);

sections.forEach(section => {
  const content = section.querySelector(".content");

  // Crée le bouton
  const bouton = document.createElement("button");
  bouton.textContent = "lire";
  bouton.classList.add("btn-lire");

  // Cache le contenu au départ
  content.classList.remove("active");

  // Place le bouton avant le contenu
  section.insertBefore(bouton, content);

  // Clic sur le bouton lire / fermer
  bouton.addEventListener("click", () => {
    const isOpen = content.classList.contains("active");

    if (isOpen) {
      content.classList.remove("active");
      bouton.textContent = "lire";
    } else {
      content.classList.add("active");
      bouton.textContent = "X";
    }
  });

  // Fermer en cliquant sur le fond
  content.addEventListener("click", (e) => {
    if (e.target === content) {
      content.classList.remove("active");
      document.body.classList.remove("modal-open");
      bouton.textContent = "lire";
    }
  });
});

