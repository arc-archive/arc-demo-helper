import { html } from 'lit-html';
import { DemoPage } from '../index.js';
import '../arc-interactive-demo.js';

export class ComponentDemo extends DemoPage {
  contentTemplate() {
    return html`
      <h2>ARC demo page</h2>
      ${this.demoTemplate()}
    `;
  }

  demoTemplate() {
    const {
      demoStates,
      darkThemeActive,
      anypoint,
    } = this;
    return html`
    <section class="documentation-section">
      <h3>ARC components demo pages</h3>
      <arc-interactive-demo
        .states="${demoStates}"
        @state-changed="${this._demoStateHandler}"
        ?dark="${darkThemeActive}"
      >
        <dl slot="content">
          <dt><a href="./base-layout.html">base-layout.html</a></dt>
          <dd>Basic layout demo page</dd>

          <dt><a href="./helper.html">helper.html</a></dt>
          <dd>arc-demo-helper demo page</dd>
        </dl>
      </arc-interactive-demo>
      <p>Anypoint theme enabled: ${anypoint}</p>
    </section>
    `;
  }
}
const instance = new ComponentDemo();
instance.render();
