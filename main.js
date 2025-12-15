const fs = require("fs");
const path = require("path");

var showdown  = require('showdown'),
    converter = new showdown.Converter();

let vaultPath = "C:/Users/naya/Desktop/media mystere";

let canvasPath = "C:/Users/naya/Desktop/media mystere/canvas media mystere.canvas";

const canvasData = fs.readFileSync(canvasPath, "utf8");
const canvas = JSON.parse(canvasData);

// Fonction pour générer un ID depuis le titre
function generateIdFromTitle(title) {
	return title
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "") // Supprime les accents
		.replace(/[^a-z0-9]+/g, "-") // Remplace les caractères non alphanumériques par des tirets
		.replace(/^-+|-+$/g, ""); // Supprime les tirets au début et à la fin
}

// Génère une page HTML simple pour chaque nœud du canvas
const outputDir = path.join(__dirname, "output");

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

// Générer les divs pour tous les nœuds
let nodesHtml = "";

canvas.nodes.forEach((node) => {
	const nodeId = generateIdFromTitle(
		node.text || node.file || `node-${node.id}`
	);
	const content = node.text || node.file || "";

    const contentFile = fs.readFileSync(path.join(vaultPath, content), "utf8");

    let htmlContent = converter.makeHtml(contentFile);


	nodesHtml += `    <div class="${nodeId}">
        <h2>${node.text || node.file || "Untitled"}</h2>
        <pre class="content">${htmlContent}</pre>
    </div>
`;
});

// Créer une seule page HTML contenant tous les nœuds
const html = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Canvas Site</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="customStyle.css">
</head>
<body>
${nodesHtml}
<script>
    // Centrer le scroll au milieu de la page
    window.addEventListener('load', function() {
        window.scrollTo(
            (document.body.scrollWidth - window.innerWidth) / 2,
            (document.body.scrollHeight - window.innerHeight) / 2
        );
    });
</script>
</body>
<script src="customMain.js"></script>
</html>`;

const filename = "index.html";
fs.writeFileSync(path.join(outputDir, filename), html, "utf8");
console.log(`Page générée: ${filename}`);

let bodyWidth = 10000;
let bodyHeight = 10000;

// Générer le CSS de base
let cssContent = `
body { margin: 0; padding: 0; height: 100%; overflow: auto; position: relative; width: ${bodyWidth}px; height: ${bodyHeight}px; }
body { font-family: Arial, sans-serif; position: relative; min-height: 100vh; }
div[class] { position: absolute; padding: 20px; border: 1px solid #ddd; box-sizing: border-box; }
.content { white-space: pre-wrap; }
`;

// Ajouter une classe CSS pour chaque nœud
canvas.nodes.forEach((node) => {
	const nodeId = generateIdFromTitle(
		node.text || node.file || `node-${node.id}`
	);
	cssContent += `.${nodeId} {
    left: ${node.x + bodyWidth / 2}px;
    top: ${node.y + bodyHeight / 2}px;
}

`;
});

fs.writeFileSync(path.join(outputDir, "styles.css"), cssContent, "utf8");
console.log("Fichier CSS généré: styles.css");

console.log(`\nLa page a été générée dans le dossier: ${outputDir}`);
