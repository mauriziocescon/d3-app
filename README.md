Starter Kit for a d3 application
=========

## How to build the app

1. Before starting, take a look at [The Future of Declaration Files](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/)

2. Download and install [NodeJS](https://nodejs.org/en/)

3. From the console, run ``npm install``

4. On the console, run ``npm run build`` in order to build the code inside *dist* 

5. On the console, run ``npm run serve`` in order to launch the application 
  
## Libs & Tooling

1. [jQuery.js](https://jquery.com/)

2. [d3.js](https://d3js.org/)

3. [Typescript](https://www.typescriptlang.org/) (with ``--strict true``) 

4. [Bootstrap](https://getbootstrap.com)

5. [Font Awesome](http://fontawesome.io)

6. [Sass](http://sass-lang.com/) 

7. [CSS Modules](https://github.com/css-modules/css-modules) 

8. [Webpack](https://webpack.js.org/) 

9. [Babel](https://babeljs.io/) 

10. [TSLint](https://palantir.github.io/tslint/) 

11. [Stylelint](https://stylelint.io/) 

## CSS Modules

1. [sass-resources-loader](https://github.com/shakacode/sass-resources-loader): variables / classes in ``assets/stylesheets/base.scss`` are shared across all SASS styles

2. [typings-for-css-modules-loader](https://github.com/Jimdo/typings-for-css-modules-loader): Typescript typings for each sass file

## Backend implementation 

Definition of mock responses using [json-server](https://github.com/typicode/json-server) and [faker](https://github.com/Marak/faker.js) (APIs available at `http://localhost:5000`)

## Working with editors/IDEs supporting “safe write”

Take a look at the following [page](https://webpack.github.io/docs/webpack-dev-server.html#working-with-editors-ides-supporting-safe-write) if you use IntelliJ or VIM 
