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

## Components

A component describes a part of the user interface:

- Template: Visible part (HTML)
- Class: Logic in TypeScript, annotated using `@Component`
- Root Component: `AppComponent`

Example:

```typescript
@Component({
    selector: 'my-component',
    template: '<h1>My Component</h1>',
    styles: [
        'font-family: sans-serif;'
    ]
})
export class MyComponent {}
```

- The `selector` defines the name of the _Host Element_, which can be used as
  `<my-component></my-component>` in other templates, using the defined prefix
  in the name.
- The template can be defined inline using `template` or using `templateUrl` as
  a relative link to a HTML file.
- The styles can be defined inline using `styles` or using `styleUrls` as an
  array of relative links to CSS files.

_Bindings_ are used for templates and components to communicate:

- _property bindings_: display data from the component on the template
- _event bindings_: events on the template influence the data on the component

_View Encapsulation_ limits the scope of CSS declarations to the respective
component.

Components are declared in `@NgModule` under `declarations`:

```typescript
import { SomeComponent } from './some/some-component';

@NgModule({
    declarations: [
        SomeComponent
    ]
})
```

Generate a new component:

    ng generate component foobar

Which creates `FoobarComponent` with all according files in `src/app/[app-name]/foobar-component`:

- `foobar.component.css`: style sheet
- `foobar.component.html`: HTML template
- `foobar.component.spec.ts`: test case
- `foobar.component.ts`: component

The component is registered in `src/app/app.module.ts` automatically under `declarations`.

Within a component class, properties must either be initialized or declared as optional using the `?` suffix or the `… | undefined` type annotation.

Properties can be displayed directly in templates. Templates support various kinds of syntax:

- Interpolation: `{{…}}`
    - access to a component's (`public` and `protected`) properties and methods
    - `{{ birthDate | date }}`
- Property Binding: `[…]`
    - assignment to a component's property
    - `<foo [bar]="qux"></foo>`
- Event Biding: `(…)`
    - connect DOM events to component methods
    - `<foo (click)="doSomething()"></foo>`
- Two-Way Binding: `[(…)]`
    - bi-directional property access (read/write)
    - `<foo [(bar)]="qux></foo>`
- Structural Directives
    - define DOM structure, e.g. using `*ngIf`, `*ngFor`
    - `<p *ngFor="let person of poeple; index as i">{{ i }}) {{ person }}</p>`
        - automatic variables: `index`, `first`, `last`, `odd`, `even`
    - `<ng-container>` can be used to apply structural directives without inserting additional elements into the DOM