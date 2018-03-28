# Task

Based on the included mockup, create an application which will display a list of people/organisms and their information.
The user will be able to filter the list of organisms based on criteria (left sidebar) as well as search.

You can use the Star Wars API: https://swapi.co/api/people/

## Functionality requirements:

- The user can select multiple filters (in an **OR** relationship between them)
- The search functionality searches for the name of the organism
- Search input and filters are working together in an **AND** relationship, meaning that if a filter is selected, the search will take that into account, and vice-versa
- No need to be responsive (CSS)
- No need to be cross-browser compatible - will be viewed in Chrome

## A few important points that we highly appreciate:

- Great code quality & architectural design
- Unit tests
- MVP approach - do the best that you can in the allotted time-frame, and be ready to suggest improvements for a subsequent iteration
- No helper libraries/packages (Bootstrap, Moment.js etc.) - we support Redux/Ngrx though
- Being able to support your decisions - explain why you chose a specific way, when asked

#### Extra points

Paginate the results (10 results per page)

## Included files:

- The mockup in [Sketch](https://www.sketchapp.com/) (for MacOS users) or PDF format
- In the `/src/assets` directory are included:
	- An `/icons` directory with SVG symbols definition and a folder with all individual SVGs, so that you can choose which one you prefer to use
	- A `/css` directory with an .scss file with some basic variables to help you get started


<hr> 


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.0.

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

#### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
