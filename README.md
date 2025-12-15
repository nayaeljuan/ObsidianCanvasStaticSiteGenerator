# ObsidianCanvasStaticSiteGenerator

Générateur de site statique à partir d'un fichier Canvas d'Obsidian.

## Installation

1. Clonez le repository
```bash
git clone https://github.com/RobinMoretti/ObsidianCanvasStaticSiteGenerator.git
cd ObsidianCanvasStaticSiteGenerator
```

2. Installez les dépendances
```bash
npm install
```

## Configuration

Ouvrez le fichier `main.js` et modifiez les chemins selon votre configuration :

```javascript
let vaultPath = "/Users/robinmoretti/Documents/Vaults/test";
let canvasPath = "/Users/robinmoretti/Documents/Vaults/test/Site.canvas";
```

- `vaultPath` : Chemin vers votre vault Obsidian
- `canvasPath` : Chemin vers le fichier Canvas (.canvas) à convertir

## Utilisation

Exécutez le générateur :

```bash
npm start
```

Le site généré sera créé dans le dossier `output/` avec :
- `index.html` : Page principale contenant tous les nœuds du canvas
- `styles.css` : Feuille de style avec le positionnement des nœuds

## Fonctionnalités

- Conversion automatique du Markdown en HTML (via Showdown)
- Positionnement des nœuds selon leur disposition dans le Canvas
- Scroll centré au chargement de la page
- Classe CSS unique pour chaque nœud (basée sur le titre)