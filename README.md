[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/arc-demo-helper.svg)](https://www.npmjs.com/package/@advanced-rest-client/arc-demo-helper)

[![Build Status](https://travis-ci.com/advanced-rest-client/arc-demo-helper.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/arc-demo-helper)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/arc-demo-helper)

## arc-demo-helper

An element to help create demo pages for ARC components based on LitElement.

## Usage

### Installation

```sh
npm install -D @advanced-rest-client/arc-demo-helper
```

### Building a demo page

To build a demo page for a component use `DemoPage` class as a base class of the demo page. It has a basic set of methods that help build unified demo page.

The goal of a demo page is to show how a component behaves giving different configuration options. The demo page must include all configuration options so it is easy for both a developer and the consumer to recognize what the component is doing.

All API Components demo pages uses the `<arc-interactive-demo>` element that creates a tile with the component being demoed. This element has also an API to provide an unified and accessible way of providing configuration options.

#### Basic Example

First extend the base class, define main content template, and initialize the demo.

*base-layout.html*
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
    <title>Base layout</title>
  </head>
  <body class="styled">
    <div id="demo"></div>

    <script type="module" src="./base-layout.js"></script>
  </body>
</html>
```

*base-layout.js*
```js
import { html } from 'lit-html';
import { DemoPage } from '../index.js';

class ComponentDemo extends DemoPage {
  contentTemplate() {
    return html`<p>demo content</p>`;
  }
}

const instance = new ComponentDemo();
instance.render();
```

The `render()` function generates base layout for the demo page and takes template retuned by the `contentTemplate()` to put it into
the main demo area. Computations are asynchronous. The DOM is rendered in the next event loop after initialization.

#### Component title

Define a constructor with `componentName` property set to the component name. This renders the component name in the title bar.

```js
import { html } from 'lit-html';
import { DemoPage } from '../index.js';

class ComponentDemo extends DemoPage {
  constructor() {
    super();
    this.componentName = 'my-component';
  }

  ...
}

const instance = new ComponentDemo();
instance.render();
```

#### Basic view options

By setting `renderViewControls` property you enable some basic UI controls to change the behaviour of the demo page. Basic options are:
-   Toggling dark theme
-   Toggling `narrow` property in the template
-   Toggling styles applied to the component


```js
import { html } from 'lit-html';
import { DemoPage } from '../index.js';

class ComponentDemo extends DemoPage {
  constructor() {
    super();
    this.componentName = 'my-component';
    this.renderViewControls = true;
  }

  contentTemplate() {
    const { narrow } = this;
    return html`<my-component ?narrow="${narrow}">
      demo content
    </my-component>`;
  }
}

const instance = new ComponentDemo();
instance.render();
```

The **dark theme** should be applied by setting up styles for `body.styled.dark` CSS selector.

```css
body.styled.dark {
  ...
}
```

The **narrow** attribute is commonly used in the components to tell the component that it should render mobile friendly view, if supported. When this option is toggled then the `narrow` property on the demo class is set to the corresponding boolean value and can be used in the content template.

Finally, the **toggle styles option** toggles `styled` class from the `body` element.

#### Observable properties

The `DemoPage` has `initObservableProperties()` method that registers properties set on the demo page as "observable". When a value of the property change then the view is re-rendered. The operation is deferred so it is safe to set multiple properties at the same time.

```js
class ComponentDemo extends DemoPage {
  constructor() {
    super();
    this.initObservableProperties([
      'prop1', 'prop2'
    ]);
  }

  someMethod() {
    this.prop1 = 'value 1';
    this.prop2 = 'value 2';
  }

  contentTemplate() {
    const { prop1, prop2 } = this;
    return html`<p>
      prop1: ${prop1}, prop2: ${prop2}
    </p>`;
  }
}
```

#### Styling the demo

All variables and styles for the demo page should be applied to `body.styled` CSS selector or its children. This way it is easy to switch between demo-styled and un-styled element view. The demo base class has some basic styling included with it. You can overwrite them by setting own CSS in the demo HTML template.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
    <title>Base layout</title>
    <style>
    body.styled {
      --primary-color: blue;
    }
    body.styled.dark {
      --primary-color: white;
    }
    </style>
  </head>
  <body class="styled">
    <div id="demo"></div>

    <script type="module" src="./base-layout.js"></script>
  </body>
</html>
```

### Building an API demo page

To build an API related demo page use `ApiDemoPage` class as a base class for the demo page. It extends `DemoPage` class but adds additional UI and logic into it. The `ApiDemoPage` adds dropdown to select an API (demo-api by default), adds logic to load API model, adds API navigation and support for handling selection.

Finally the `ApiDemoPage` class mixes in `AmfHelperMixin` in the class' prototype. All helper's methods are available in the class.

#### Minimal example

```js
import { html } from 'lit-html';
import { ApiDemoPage } from '../index.js';

class ApiDemo extends ApiDemoPage {
  constructor() {
    super();
    this.componentName = 'api-my-component';
    this.renderViewControls = true;
  }

  _navChanged(e) {
    const { selected, type } = e.detail;
    // process selection information
  }

  contentTemplate() {
    return html`<api-my-component>This is demo page for API components</api-my-component>`;
  }
}

const instance = new ApiDemo();
instance.render();
```

#### Adding API definition

All APIs has to be located in `demo/` folder. By default the demo page will try to load `demo-api.json` on page load. This can be changed by extending `_apiListTemplate()` method. It should return a template of `<anypoint-item>` with `data-src` property that contains a name of a file to load.

```js
class ApiDemo extends ApiDemoPage {
  _apiListTemplate() {
    return html`
    <anypoint-item data-src="my-api.json">Demo api</anypoint-item>
    <anypoint-item data-src="my-api-compact.json">Demo api - compact version</anypoint-item>`;
  }
}
```

### Generating API models

Use `@api-components/api-model-generator` module to generate the models using (most often) the last version of AMF.

1.  Install the library as a dev dependency of the project.
2.  Add `.json` files to Git ignored list
    ```
    /demo/*.json
    !demo/apis.json
    ```
3.  Add [demo/model.js](model.js) file to run model generator
4.  Add [demo/api.js](api.js) file that defines APIs to process
5.  Add command to generate models
    ```
    "scripts": {
      "prepare": "node demo/model.js"
    }
    ```

The APIs definition file must contain a map of APIs where the key is the path to the file
and the value is an object that defines processing options:
-   `type` (required) API type: `RAML 1.0`, `RAML 0.8`, `OAS 3.0`, `OAS 2.0`
-   `mime` (optional) API mime. Defaults to `application/yaml+raml`
-   `resolution` (optional) AMF resolution pipeline. Defaults to `editing`

### arc-demo-helper

The element allows to declaratively define a demo of an element that renders the code below the demo area.
This element should not be used any more. Please, upgrade to `arc-interactive-demo` element with combination with the demo page.

```html
<arc-demo-helper>
  <template>
    <button id="testButton">This is test Button</button>
    <script>
    {
      document.getElementById('testButton').addEventListener('click', (e) => {
        e.target.innerText = 'It works!';
      });
    }
    </script>
  </template>
</arc-demo-helper>
```

### arc-interactive-demo

An element that renders demo content in predefined layout with a support for configuration options.

Pass `states` which is an Array<String> that contains a list of available general UI states of the element. In API Components it is usually Material Design's Filled and Outlined UI and Anypoint's UI.
The `selectedState` sets selected state. This property is not required as the element keeps it's own internal state.
The application should handle `state-chanegd` event and update the UI according to user selection.

The main demo content element must include `slot="content"` attribute to be distributed in the correct place.

Elements with `slot="options"` attribute are rendered in the options drawer.

```html
<arc-interactive-demo
  .states="${demoStates}"
  .selectedState="${demoState}"
  @state-chanegd="${this._demoStateHandler}"
  ?dark="${darkThemeActive}"
>
  <!-- Main content -->
  <my-component
    ?compatibility="${compatibility}"
    ?outlined="${outlined}"
    slot="content"
  ></my-component>

  <!-- Available options -->
  <label slot="options" id="mainOptionsLabel">Options</label>
  <!-- the "_toggleMainOption" handler is defined in DemoPage class. -->
  <anypoint-checkbox
    aria-describedby="mainOptionsLabel"
    slot="options"
    name="prop1"
    @change="${this._toggleMainOption}">Boolean value</anypoint-checkbox>
</arc-interactive-demo>
```

## Development

```sh
git clone https://github.com/advanced-rest-client/arc-demo-helper
cd arc-demo-helper
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests
```sh
npm test
```
