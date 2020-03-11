import { html } from 'lit-html';
import { ApiDemoPage } from '../index.js';

class ApiDemo extends ApiDemoPage {
  constructor() {
    super();
    this.componentName = 'api-my-component';
    this.renderViewControls = true;
  }

  _apiListTemplate() {
    return html`<anypoint-item data-src="demo-api.json">Demo api</anypoint-item>
    <anypoint-item data-src="demo-api-compact.json">Demo api - compact version</anypoint-item>`;
  }

  contentTemplate() {
    return html`<p>This is demo page for API components</p>`;
  }
}


const instance = new ApiDemo();
instance.render();
