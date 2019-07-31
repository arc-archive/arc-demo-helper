import { html, render } from 'lit-html';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@api-components/raml-aware/raml-aware.js';
import './api-page-styles.js';
import './demo-pages-shared-styles.js';
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
    this._darkThemeHandler = this._darkThemeHandler.bind(this);
    this._narrowHandler = this._narrowHandler.bind(this);
    this._stylesHandler = this._stylesHandler.bind(this);

    window.addEventListener('api-navigation-selection-changed', this._navChanged);
    setTimeout(() => {
      document.getElementById('apiList').selected = 0;
    }, 2);

    this.endpointsOpened = true;
    this.docsOpened = false;
    this.typesOpened = false;
    this.securityOpened = false;
    this.renderViewControls = true;

    document.body.classList.add('styled');
  }

  get amf() {
    return this._amf;
  }

  set amf(value) {
    this._setObservableProperty('amf', value);
  }

  get narrowActive() {
    return this._narrowActive;
  }

  set narrowActive(value) {
    this._setObservableProperty('narrowActive', value);
  }

  get stylesActive() {
    return this._stylesActive;
  }

  set stylesActive(value) {
    this._setObservableProperty('stylesActive', value);
  }

  get darkThemeActive() {
    return this._darkThemeActive;
  }

  set darkThemeActive(value) {
    this._setObservableProperty('darkThemeActive', value);
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

  async _loadFile(file) {
    const response = await fetch('./' + file);
    const data = await response.json();
    this.amf = data;
  }
  /**
   * This method to be overriten in child class to handle navigation.
   * @param {CustomEvent} e Dispatched navigation event
   */
  _navChanged(e) {
    const { selected, type } = e.detail;
    console.log(`Navigation changed. Type: ${type}, selected: ${selected}`);
  }

  _darkThemeHandler(e) {
    this.darkThemeActive = e.target.checked;
    if (e.target.checked) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  _narrowHandler(e) {
    this.narrowActive = e.target.checked;
  }

  _stylesHandler(e) {
    this.stylesActive = e.target.checked;
    if (e.target.checked) {
      document.body.classList.add('styled');
    } else {
      document.body.classList.remove('styled');
    }
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
   * Abstract method. When not overriding `render()` method you can use
   * this function to render content inside the standar API components layout.
   *
   * ```
   * contentTemplate() {
   *  return html`<p>Demo content</p>`;
   * }
   * ```
   */
  contentTemplate() {}
  /**
   * Call this on the top of the `render()` method to render demo navigation
   * @return {Object} HTML template for demo header
   */
  headerTemplate() {
    return html`
    <raml-aware .api="${this.amf}" scope="model"></raml-aware>
    <header>
      <paper-dropdown-menu label="Select demo API">
        <paper-listbox slot="dropdown-content" id="apiList" @selected-changed="${this._apiChanged}">
        ${this._apiListTemplate()}
        </paper-listbox>
      </paper-dropdown-menu>
      <div class="spacer"></div>
      ${this.renderViewControls ? html`<paper-menu-button dynamic-align>
      <paper-icon-button icon="settings" slot="dropdown-trigger"></paper-icon-button>
      <div slot="dropdown-content">
        <div class="settings-action-item">
          <paper-toggle-button @checked-changed="${this._darkThemeHandler}">Toggle dark theme</paper-toggle-button>
        </div>
        <div class="settings-action-item">
          <paper-toggle-button @checked-changed="${this._narrowHandler}">Toggle narrow attribute</paper-toggle-button>
        </div>
        <div class="settings-action-item">
          <paper-toggle-button checked @checked-changed="${this._stylesHandler}">Toggle styles</paper-toggle-button>
        </div>
      </div>`: undefined}
    </header>`;
  }

  render() {
    if (this._rendering) {
      return;
    }
    this._rendering = true;
    setTimeout(() => {
      this._rendering = false;
      this._render();
    });
  }

  _render() {
    render(html`
      ${this.headerTemplate()}
      <section role="main" class="horizontal-section-container centered main">
        ${this._apiNavigationTemplate()}
        <div class="demo-container">
          ${this.contentTemplate()}
        </div>
      </section>`, document.querySelector('#demo'));
  }
}
