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

### Property Bindings

Parent components pass data to child components using _property bindings_.

A property must exist in the component class; declared as public and annotated
using the `Input` decorator.

Template:

```html
<my-component [someProperty]="expression"></my-component>
```

Component (TypeScript Class):

```typescript
import { Component, Input } from '@angular/core';

@Component({
    selector: 'my-component',
    // …
})
export class MyComponent {
    @Input() someProperty: string = '';
}
```

Properties cannot be made mandatory. They are either optional or have a default
value. Any kind of object can be set as a property, not just primitives.

Native DOM attributes with (possibly) dynamic values can be defined using the
same syntax:

```html
<img [src]="coverUrl">
```

String interpolation can be used in combination with HTML's native attribute syntax:

```html
<img src="{{ coverUrl }}">
```

There are special kinds of property bindings:

1. attribute bindings, e.g. for ARIA attributes, table's `colspan`/`rowspan`
    - `<td [attr.colspan]="theColspan">`
2. class bindings to set a CSS class dynamically based on a predicate
   expression
    - `<input [class.active]="isActive">`
    - alternative for multiple classes: `ngClass` directive
        - `<div [ngClass]="{ active: isActive, 'has-error': hasError }"></div>`
3. style bindings to set individual styles to elements
    - `<p [style.color]="theColor">`
    - alternative for multiple styles: `ngStyle` directive
        - `<p [ngStyle]="{ color: fgColor, backgroundColor: bgColor }"></p>`

Property bindings are affected by the following _lifecycle_:

1. the component's `constructor()` is called
2. the input properties are initialized
3. `ngOnChanges()` is called once at the beginning (and repeatedly for every change)
4. `ngOnInit()` is called only once

The interfaces `OnInit` (for `ngOnInit(): void`) and `OnChanges` (for
`ngOnchanges(): void`) from Angular Core have to be implemented in the
component class.

### Event Bindings

A component's method (`handleEvent`) can be bound to an event using the following syntax:

```html
<my-component (theEvent)="handleEvent()"></my-component>
```

Events can be native DOM events:

```html
<button (click)="handleClick()">Click Here!</button>
```

Which are handled in the component by a respective method:

```typescript
export class MyComponent {
    handleClick() {
        console.log('click');
    }
}
```

The event's payload can be passed optionally using the pre-defined `$event` variable:

```html
<button (click)="handleClick($event)">Click Here!</button>
```

Which becomes available as a `PointerEvent` in the parameter list of the method:

```typescript
export class MyComponent {
    handleClick(e: PointerEvent) {
        console.log(e);
    }
}
```

Defining custom events requires:

1. an event emitter on the child component, to be used in the template code of the parent component
2. a handler method on the parent component, which is assigned to the child component's event

Example (template of the parent component):

```html
<child-component (customEvent)="handleEvent()"></child-component>
```

The parent component implements the `handleEvent` method.

The child component defines the custom event:

```typescript
export class ChildComponent {
    @Output() customEvent = new EventEmitter<string>();
    triggerEvent() {
        this.customEvent.emit('hello');
    }
}
```

Calling the `triggerEvent` method will emit the custom event, about which the
parent component is notified through the invocation of its `handleEvent` method,
e.g.:

```html
<button (click)="triggerEvent()">Trigger Event</button>
```

## Interfaces

Generate a new interface (e.g. to be used to model domain objects):

    ng generate interface shared/foobar

Generates an empty interface at `src/app/shared/foobar.ts`.

## Modules

- Applications are structured into logical groups (i.e. by features) using
  _modules_.
- The central module of the application is called the _root module_ and defined
  in a class called `AppModule` defined in `main.ts`.
- Module classes have the name suffix `Module` by convention. Their
  implementation consists of an empty class, since everything is declared using
  the `NgModule` decorator, which has the following properties:
    - `declarations`: Parts (components, pipes, providers) being defined within
      the module, i.e. in the same folder. No part must be defined in more than
      one module.
    - `imports`: Parts that are used within the module, e.g. the
      `RouterModule`, the `BrowserModule` etc.
    - `exports`: Parts from the module being made available to other modules.
- _Shared modules_ provide commonly used functionality beyond specific
  features. They usually don't use routing.

Modules are generated as follows:

```sh
ng generate module FooModule --module BarModule
```

Or with routing enabled:

```sh
ng generate module FooModule --module BarModule --routing
```

This generates the module `FooModule` within the `BarModule`. For top-level
modules, the `AppModule` is used with the `--module` option. The parent module
will automatically import the newly defined module.

A component (`FooComponent`) can be defined within a module (`BarModule`) as follows:

```sh
ng generate component FooComponent --module BarModule
```

Or:

```sh
ng generate component bar/foo
```

TODO: test syntax

## Services

In Angular, a _service_ is a TypeScript class that offers functionality to be
re-used by components or other services. Following the _Inversion of Control_
principle, the service is not instantiated where it is used, but requested as a
dependency and provided to the constructor from the outside (_Dependency
Injection_). In Angular, the framework provides those instances, usually as a
_Singleton_, i.e. the same service instance is shared over its usages in
different places.

```typescript
@Component({…})
export class MyComponent {
  constructor(private myService: MyService) {}
}
```

A service class must be annoted as `@Injectable` in order to be automatically
instantiated for dependency injection:

```typescript
@Injectable({
  providedIn: 'root'
})
export class MyService {
  consructor(private otherService: SomeOtherService) {}
}
```

This service depends on another service, which is also injected as a dependency.

To generate a service:

```sh
ng generate service my
```

The `-service` (file name) resp. `Service` (class name) suffix is added
automatically.

A _provider_ needs to be registered 1) either explicitly in a module, or 2) it
registers itself. The second variant is preferred nowadays, because it allows
for _three shaking_ (omitting unreferenced classes in the compiled bundle).

For the explicit variant 1), the service class is listed under `providers` in
the `@NgModule` decorator:

```typescript
@NgModule({
  providers: [MyService]
})
export class AppModule {}
```

A service thus registered in the `AppModule` is injectable througout the entire
application.

Since the service is referenced from the module, the service class is always
present in the compiled bundle, even if it is never used as a dependency.

If the service registers itself as in variant 2), this problem is solved:

```typescript
@Injectable({
  providedIn: 'root'
})
export class MyService {}
```

A specific service can be replaced by another implementation, be it a class
using the `useClass` property, a value using the `useValue` property, or using
a factory for more involved instantiations that can make use of other
dependencies:

```typescript
@NgModule({
  providers: [
    { provide: SomeService, useClass: SomeServiceImplementation },
    { provide: AnotherService, useValue: { foo: () => 'hello' } },
    { provide: InvolvedService, useFactory: (dep: Dep) => new RichService(dep), deps: [Dep] }
  ]
})
export class AppModule {}
```

To inject _values_ instead of services, see the `InjectionToken` concept
combined with the `inject` function.

During initialization, injection can also be performed programmatically using
the `inject` function.

