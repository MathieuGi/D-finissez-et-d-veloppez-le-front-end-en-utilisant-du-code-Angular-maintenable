# Architecture du projet

## Structure des dossiers

- src/app/ ----------------------------> Le contenu du projet
  - components/ -----------------------> Contient les composants spécifiques du projet
    - header/
    - footer/
    - countries-overview/
  - models/ ---------------------------> Contient les classes objets et interfaces
    - country.model
  - pages/ ----------------------------> Contient la liste des pages du site
    - country/
    - home/
    - not-found/
  - services/ -------------------------> Contient les services
    - country.service
  - standalones/ ----------------------> Contient les composants standalone réutilisables même hors projet
    - pie-chart/
    - chart-indicator/
    - bar-chart/
  - app.module.ts
  - app.component
  - app-routing.module.ts

## Les composants et leur rôle

Le site est composé de 3 pages :

- **Home** : Affiche le composant coutries-overview qui affiche quelques indicateurs et un graphique affichant les médailles par pays
- **Country** : Affiche les informations détaillées d'un pays en récupérant son id dans l'url
- **Not found** : Affiche une page d'erreur en cas d'url inexistante

Les données liées aux pays sont récupérées dans les composants via le service `CountryService` qui expose deux méthodes :

- **getCountries** : Renvoie un observable contenant la liste des pays au format Country (voir `models`)
