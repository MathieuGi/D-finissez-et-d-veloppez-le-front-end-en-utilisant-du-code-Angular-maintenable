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

1. Le site est composé de 3 pages :
   - **Home** : Affiche le composant coutries-overview qui affiche quelques indicateurs et un graphique affichant les médailles par pays
   - **Country** : Affiche les informations détaillées d'un pays en récupérant son id dans l'url
   - **Not found** : Affiche une page d'erreur en cas d'url inexistante

2. Les données liées aux pays sont récupérées dans les composants via le service `CountryService` qui expose deux méthodes :
   - **getCountries** : Renvoie un observable contenant la liste des pays au format Country (voir `models`). La requête http n'est exécutée que pour le premier appel

   - **getCountryById** : Attend un id (type string) comme argument et renvoie le pays correspondant. La requête http n'est exécutée que pour le premier appel

Le service est conçu de sorte à pouvoir remplacer facilement les appels http en local par des appels http vers un backend/API. En effet ces appels ne sont présents que dans le service, ce qui permet une séparation entre la logique métier du code et la gestion des appels API. De plus des models ont été créés pour pouvoir faire la conversion des données serveur (DTO) vers les données métiers de l'application Front

3. La composant `app.component` est chargé d'affiché le contenu du site tout en l'encadrant du header et du footer qui doivent être toujours présent. Il se base sur le module `app-router` pour savoir qu'elle composant afficher en fonction de l'url

Les composants présents dans standalones sont des composants réutilisable. Ils sont utilisables également indépendamment de l'application
