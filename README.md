# Task

Based on the included mockup, update this application which displays a list of people/organisms and their information.

The app uses the Star Wars API: https://swapi.co/

## Tasks to complete:

- Add the search functionality
-- The search functionality is a text input, and searches for the name of the organism when the search button is clicked
- Convert the person's name to a link that links to the url value returned in their record
- Add a spec for the person's homeworld.
- Create and apply a pipe that takes the person's gender and converts it to a gender icon or a question mark.
- Create and apply a pipe that adds units for both the height and weight fields.

## A few important points that we highly appreciate:

- Great code quality & architectural design [**done**]
- Unit tests [**done**]
- MVP approach - do the best that you can in the allotted time-frame, and be ready to suggest improvements for a subsequent iteration [**done**]
- No helper libraries/packages (Bootstrap, Moment.js etc.) - we support Redux/Ngrx though [**done**]
- Being able to support your decisions - explain why you chose a specific way, when asked [**done**]

#### Extra points (nice to have)

- Paginate the results (10 results per page)
- Fully responsive

## Included files:

- The mockup in [Sketch](https://www.sketchapp.com/) (for MacOS users) or PDF format
- In the `/src/assets` directory are included:
	- An `/icons` directory with SVG symbols definition and a folder with all individual SVGs, so that you can choose which one you prefer to use
	- A `/css` directory with an .scss file with some basic variables to help you get started


<hr>


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.0.

#### Development server

Run `npm start` for a dev server. Navigate to `http://localhost:3212/`. The app will automatically reload if you change any of the source files.

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
