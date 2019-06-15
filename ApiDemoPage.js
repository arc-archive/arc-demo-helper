import { html } from 'lit-html';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
/**
 * Base class for API components demo page.
 * It creates basic sceleton for API demo page.
 *
 * Usage
 *
 * ```javascript
 * import { html, render } from 'lit-html';
 * import {ApiDemoPageBase} from '@advanced-rest-client/arc-demo-helper/ApiDemoPage.js';
 *
 * class ApiDemo extends ApiDemoPageBase {
 *  render() {
 *    render(html`
 *    ${this.headerTemplate()}
 *    <section role="main" class="vertical-section-container centered main">
 *      ${this._apiNavigationTemplate()}
 *      ...
 *    </section>
 *    `);
 *  }
 * }
 * const instance = new ApiDemo();
 * instance.render();
 * ```
 */
export class ApiDemoPageBase {
  constructor() {
    this._apiChanged = this._apiChanged.bind(this);
    this._navChanged = this._navChanged.bind(this);

    window.addEventListener('api-navigation-selection-changed', this._navChanged);
    setTimeout(() => {
      document.getElementById('apiList').selected = 0;
    });

    this.endpointsOpened = true;
    this.docsOpened = false;
    this.typesOpened = false;
    this.securityOpened = false;
  }

  get amf() {
    return this._amf;
  }

  set amf(value) {
    this._setObservableProperty('amf', value);
  }

  _setObservableProperty(prop, value) {
    const key = '_' + prop;
    if (this[key] === value) {
      return;
    }
    this[key] = value;
    this.render();
  }

  _apiChanged(e) {
    const file = e.target.selectedItem.dataset.src;
    this._loadFile(file);
  }

  _loadFile(file) {
    fetch('./' + file)
    .then((response) => response.json())
    .then((data) => {
      this.amf = data;
    });
  }
  /**
   * This method to be overriten in child class to handle navigation.
   * @param {CustomEvent} e Dispatched navigation event
   */
  _navChanged(e) {
    const { selected, type } = e.detail;
    console.log(`Navigation changed. Type: ${type}, selected: ${selected}`);
  }
  /**
   * This method to be overriten in child class to render API options.
   * @return {Object} HTML template for apis dropdown options.
   */
  _apiListTemplate() {
    return html`
    <paper-item data-src="demo-api.json">Demo API</paper-item>
    <paper-item data-src="demo-api-compact.json">Demo API - compact</paper-item>`;
  }

  _apiNavigationTemplate() {
    return html`<api-navigation
      summary
      .amf="${this.amf}"
      ?endpoints-opened="${this.endpointsOpened}"
      ?docs-opened="${this.docsOpened}"
      ?types-opened="${this.typesOpened}"
      ?security-opened="${this.securityOpened}"></api-navigation>`;
  }
  /**
   * Call this on the top of the `render()` method to render demo navigation
   * @return {Object} HTML template for demo header
   */
  headerTemplate() {
    return html`
    <header>
      <paper-dropdown-menu label="Select demo API">
        <paper-listbox slot="dropdown-content" id="apiList" @selected-changed="${this._apiChanged}">
        ${this._apiListTemplate()}
        </paper-listbox>
      </paper-dropdown-menu>
    </header>`;
  }
}
