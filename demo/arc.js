import { html } from 'lit-html';
import { DemoPage } from '../index.js';
import '../arc-demo-helper.js';

class ComponentDemo extends DemoPage {
  constructor() {
    super();
    this._otherHandler = this._otherHandler.bind(this);
    this._componentName = 'demo-component';
  }

  contentTemplate() {
    return html`
      <p ?narrow="${this.narrow}">This is demo page for ARC components</p>

      <arc-demo-helper>
        <template>
          <p>arc-demo-helper in ArcDemoPage</p>
        </template>
      </arc-demo-helper>
    `;
  }

  _otherHandler() {
    console.log('_otherHandler');
  }

  _headerControlsTemplate() {
    return html`
      ${super._viewControlsTemplate()}
      <div class="settings-action-item">
        <anypoint-switch @checked-changed="${this._otherHandler}">Other option</anypoint-switch>
      </div>`;
  }
}

const instance = new ComponentDemo();
instance.render();
