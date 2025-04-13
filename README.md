# Learning Angular

## Setup

Install the _Angular CLI_ `ng` globally:

    npm install --global @angular/cli

If installed without the `--global` flag, execution with `npx` requires a
package specification:

    npx -p @angualar/cli ng …`

For _Visual Studio Code_, consider installing the [Angular Language
Service](https://open-vsx.org/extension/Angular/ng-template) extension.

Setup shell completion:

    ng completion

Generate a new project:

    ng new hello-world

Generate a new component:

    ng generate component foobar

Compile and run the application:

    ng serve

Run the tests:

    ng test

## Project Structure

- `index.html`: contains `<my-app></my-app>` (component defined in
  `AppComponent`)
- `main.ts`: bootstraps `AppModule`
    - `app/`
        - `app.module.ts`: defines `AppModule`, annotated using `@NgModule`
          (imports, declarations, bootstrap)
        - `app.component.ts`: defines `AppComponent`, annotated using
          `@Component` (selector, template, stylesheets)
        - `app.component.html`: defines the HTML view
        - `app.component.css`: defines the CSS stylesheet

## Project Setup

Generate a new project called `register-complaints` with routing, CSS, the `rc`
prefix, and _with_ `NgModules` (i.e. _not_ standalone):

    ng new register-complaints --routing --style=css --prefix=rc --standalone=false

A project structure with the following files (among others) is generated under
`register-complaints`:

- `angular.json`: project configuration (e.g. its prefix, stylesheets)
- `package.json` and `package-lock.json`: project metadata, dependencies and their versions, scripts
    - `npm start` runs the `start` script
    - `npm run [script]` starts any other script
- `tsconfig.json`: basic settings for the TypeScript compiler `tsc`, overwritten by…
    - `tsconfig.app.json`: compiler settings for productive code
    - `tsconfig.spec.json`: compiler settings for test code
- `src/index.html`: HTML scaffolding (uses the main component `rc-root`)
- `src/app.module.ts`: main module (starting point)
- `src/main.ts`: application bootstrapping
- `src/assets`: static ressources, e.g. graphics
    - to be used as: `<img src="assets/icon.png" alt="Icon">`

Run the project:

    cd register-complaints
    ng serve

The application runs on [localhost:4200](http://localhost:4200) and shows the content of `src/app/app.component.html`.

Stylesheets can be defined in `angular.json` under `projects` -> `[project name]`…

- `build` -> `options` -> `styles`: for productive code
- `architect` -> `test` -> `options` -> `styles`: for test cases

Use `@import '[path]/styles.css';` to include more stylesheets.

Setup ESLint:

    ng add @angular-eslint/schematics

Run the linter:

    ng lint

Automatically fix issues:

    ng lint --fix

For VSCode, consider using the `ESLint` extension.