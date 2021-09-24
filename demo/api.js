import { html } from 'lit-html';
import { ApiDemoPage } from '../index.js';

class ApiDemo extends ApiDemoPage {
  constructor() {
    super();
    this.componentName = 'api-my-component';
    this.renderViewControls = true;
    this.initObservableProperties([
      'type', 'selected',
    ]);
  }

  _apiListTemplate() {
    return [
      ['demo-api', 'Demo API'],
    ].map(([file, label]) => html`
      <anypoint-item data-src="${file}-compact.json">${label} - compact model</anypoint-item>
      <anypoint-item data-src="${file}.json">${label}</anypoint-item>
    `);
  }

  /**
   * This method to be overridden in child class to handle navigation.
   * @param {CustomEvent} e Dispatched navigation event
   */
  _navChanged(e) {
    const { selected, type } = e.detail;
    this.selected = selected;
    this.type = type;
  }

  contentTemplate() {
    return html`
      <p>This is demo page for API components</p>
      <div>
        <label>Current selection:</label>
        <p>Selected domain ID: ${this.selected}</p>
        <p>Selected node type: ${this.type}</p>
      </div>
    `;
  }
}


const instance = new ApiDemo();
instance.render();
