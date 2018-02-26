# Task

Based on the included mockup, create a single page application which will display a list of au pairs and their personal details.The user will be able to filter the list of au pairs based on criteria (left sidebar) as well as search.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.0.


## Notes:

* It should be developed using Angular 2+. `angular-cli` has been included to help get started, but the choice is up to you on how you prefer to scaffold the application
* The user can select multiple filters (in an **AND** relationship between them)
* The search functionality searches in the name and "about" text (the *lorem ipsum* one)
* Search input and filters are working together in an **AND** relationship, meaning that if a filter is selected, the search will take that into account, and vice-versa
* No need to be responsive
* No need to be cross-browser compatible - will be viewed in Chrome


## Included files:

* The mockup in [Sketch](https://www.sketchapp.com/) (for MacOS users) or PDF format
* In the `/src` directory are included the bootstrap file, the main `index.html` file, and files needed for angular & angular-cli such as polyfills, tsconfig and typings
* In the `/src/app` directory are included the component's files, as well as the data.json file with mock data of users and their personal details
* In the `/src/assets` directory are included:
	* An `/icons` directory with SVG symbols definition and a folder with all individual SVGs, so that you can choose which one you prefer to use
	* A `/css` directory with an .scss file with some basic variables to help you get started


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
