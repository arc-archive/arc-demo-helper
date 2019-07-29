import { html } from 'lit-html';
import { ApiDemoPageBase } from '../ApiDemoPage.js';

class ApiDemo extends ApiDemoPageBase {
  constructor() {
    super();
  }

  _apiListTemplate() {
    return html`<paper-item data-src="demo-api.json">Demo api</paper-item>
    <paper-item data-src="demo-api-compact.json">Demo api - compact version</paper-item>`;
  }

  contentTemplate() {
    return html`<p>This is demo page for API components</p>`;
  }
}


const instance = new ApiDemo();
instance.render();
