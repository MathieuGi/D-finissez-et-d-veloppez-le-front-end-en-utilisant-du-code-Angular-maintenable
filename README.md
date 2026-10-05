# OlympicGamesStarter

This project run with Angular 22. Verify your Angular CLI is up to date for this version

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## project architecture

This project has a simple architecture.

- We can find our components in 3 folders :
  - pages (Representing the site pages - home / country details / not found)
  - Standalones (for component that can be reused outside of the project)
  - components (for reusable components specifics to the project)
- The services folder has only one service (CountryService) for every http requests
- In the models folder we can find :
  - country-dto (Representing our country entity coming from the backend)
  - country (Representing the country entity in our app)
  - participation (Representing one country participation)
  - indicator (an interface used to display informations in pages head)
