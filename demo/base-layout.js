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
    return html`<p ?narrow="${narrow}">demo content</p>`;
  }
}

const instance = new ComponentDemo();
instance.render();
window.demoInstance = instance;
