# Learning Angular

## Setup

Install the _Angular CLI_ `ng` globally:

    npm install --global @angular/cli

If installed without the `--global` flag, execution with `npx` requires a
package specification:

    npx -p @angualar/cli ng …`

For _Visual Studio Code_, consider installing the [Angular Language Service](https://open-vsx.org/extension/Angular/ng-template) extension.

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

- `index.html`: contains `<my-app></my-app>` (component defined in `AppComponent`)
- `main.ts`: bootstraps `AppModule`
    - `app/`
        - `app.module.ts`: defines `AppModule`, annotated using `@NgModule` (imports, declarations, bootstrap)
        - `app.component.ts`: defines `AppComponent`, annotated using `@Component` (selector, template, stylesheets)
        - `app.component.html`: defines the HTML view
        - `app.component.css`: defines the CSS stylesheet
