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
      <p ?narrow="${this.narrowActive}">This is demo page for ARC components</p>

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
      ${super._headerControlsTemplate()}
      <div class="settings-action-item">
        <paper-toggle-button @checked-changed="${this._otherHandler}">Other option</paper-toggle-button>
      </div>`;
  }
}

const instance = new ComponentDemo();
instance.render();
