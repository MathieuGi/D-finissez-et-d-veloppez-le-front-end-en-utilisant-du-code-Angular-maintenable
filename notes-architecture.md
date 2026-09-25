# Etape 1 - Analyse du code et repérage des problèmes

## Global

- Component page `NotFound` en doublon (celui dans le dossier **app/pages/home** à supprimer)

- Mettre des nom variable plus clair dans les **map/foreach/...**

- Ajout d'espace et d'indentation pour plus de clarté --> Mise en place d'un fichier de conf pour le formatting (ex prettier)

- Problème fonctionnel : Le header ne devrait pas disparaitre d'une page à l'autre. Créer un component `AppHeader` et `AppFooter` communs pour l'application et les ajouter au template du AppComponent

## Home component

- #### Observables
  - Utilisation de la fonction `subscribe` depréciée. utiliser plutôt `describe({next, error, complete})`

  - Le nettoyage des observables n'est pas pris en compte (attention aux soucis de mémoire). Ajouter `takeUntilDestroyed`

- #### Variables et types
  - Réorganiser les variables pour avoir d'abord celles publics puis celles privées et par ordre alphabétique

  - Pas besoin de mot clé `public` lors de la déclaration des attributs de class car c'est le comportement par défaut

  - Typages manquants sur les variables des fonctions map/reduce/find

  - Type de retour manquant pour `buildPieChart`

- #### Lisibilité
  - découper le calcul de `totalJOs`

  - Créer une methode séparée pour le contenu du `onClick` dans `buildPieChart` (composant à part pour le pieChart)

- #### Autres
  - La requête **http** devrait être dans un **service** séparé

  - Sortir la partie header du component et créer un component séparé

  - Supprimer les `console.log` : ``console.log(`Liste des données : ${JSON.stringify(data)}`)`` et ``console.log(`erreur : ${error}`)``

  - L'erreur est récupérée mais rien n'est fait avec : Ajouter un message à l'utilisateur par exemple

## Country component

- #### Observables
  - Utilisation de `subscribe` dépréciée

  - La récupération du `countryName` est asynchrone donc ça valeur risque d'être `undefined` lorsqu'elle est utilisée dans l'appel suivant --> Il est possible d'utiliser le snapshot pour faire une récupération synchrone

  - Le nettoyage des observables n'est pas pris en compte (attention aux soucis de mémoire). Ajouter `takeUntilDestroyed`

- #### Variables et types
  - Certaines variables intermédiaires comme `participations` pourraient être supprimée

  - Typage manquant pour l'attribut de classe `totalEntries`

  - Typages manquants sur les variables des fonctions map/reduce/find

  - Type de retour manquant pour `buildChart`

- #### Autres
  - Appel `http` à mettre dans un **service** à part

  - L'erreur est récupérée mais rien n'est fait avec : Ajouter un message à l'utilisateur par exemple

  - **Service** non utilisé (`Router`)

  - Texte avec espace dans certaines url de pays (par exemple pour United States)

## Apparence

- Pour la page détails par pays un diagramme en barres serait plus clair

- Ajout d'un spinner de chargement en attendant la récupération des données pour les graphiques

- Affichage d'un message en cas d'erreur

- Ajouter un pointer pour les éléments cliquable (Pie chart)

- Adapter la taille du grapique de la page d'accueil sur mobile / Disposition des indicateurs

- Augmenter la taille de police pour le nom du pays dans le titre de la page d'un pays
