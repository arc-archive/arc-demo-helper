[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/arc-demo-helper.svg)](https://www.npmjs.com/package/@advanced-rest-client/arc-demo-helper)

[![Build Status](https://travis-ci.org/advanced-rest-client/arc-demo-helper.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/arc-demo-helper)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/arc-demo-helper)

## &lt;arc-demo-helper&gt;

An element to help create demo pages for ARC components.

### API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)

## Usage

### Installation

```sh
npm install --save @advanced-rest-client/arc-demo-helper
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import '@advanced-rest-client/arc-demo-helper/arc-demo-helper.js';
    </script>
  </head>
  <body>
    <arc-demo-helper>
      <template>
        <p>Anything to render as a demo snippet</p>
      </template>
    </arc-demo-helper>
  </body>
</html>
```

### In a other element

```js
import { LitElement, html } from 'lit-element';
import '@advanced-rest-client/arc-demo-helper/arc-demo-helper.js';

class SampleElement extends LitElement {
  render() {
    return html`<arc-demo-helper>
      <template>
        <p>Anything to render as a demo snippet</p>
      </template>
    </arc-demo-helper>`;
  }
}
customElements.define('sample-element', SampleElement);
```

### Development

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
