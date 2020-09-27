/* eslint-disable class-methods-use-this */
import { html, render } from 'lit-html';
import { AmfHelperMixin } from '@api-components/amf-helper-mixin/amf-helper-mixin.js';
import '@anypoint-web-components/anypoint-dropdown-menu/anypoint-dropdown-menu.js';
import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';
import '@api-components/api-navigation/api-navigation.js';
import '@api-components/raml-aware/raml-aware.js';
import { DemoPage } from './DemoPage.js';
import './ApiStyles.js';
import './SharedStyles.js';

/** @typedef {import('lit-html').TemplateResult} TemplateResult */
/** @typedef {import('@anypoint-web-components/anypoint-listbox').AnypointListbox} AnypointListbox */

/**
 * Base class for API components demo page.
 * It creates a skeleton for an API demo page.
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
export class ApiDemoPage extends AmfHelperMixin(DemoPage) {
  constructor() {
    super();
    this._apiChanged = this._apiChanged.bind(this);
    this._navChanged = this._navChanged.bind(this);

    this.initObservableProperties([
      'amf', 'hasData',
    ]);

    /**
     * When set the endpoint section in navigation is opened by default.
     * @type {boolean}
     * @default false
     */
    this.endpointsOpened = true;

    /**
     * When set the documentation section in navigation is opened by default.
     * @type {boolean}
     * @default false
     */
    this.docsOpened = false;

    /**
     * When set the types section in navigation is opened by default.
     * @type {boolean}
     * @default false
     */
    this.typesOpened = false;

    /**
     * When set the security section in navigation is opened by default.
     * @type {boolean}
     * @default false
     */
    this.securityOpened = false;

    /**
     * AMF model read from the API model file downloaded after initialization.
     * @type {any}
     */
    this.amf = null;

    /**
     * When set the API Navigation element won't be rendered.
     * @type {Boolean}
     * @default false
     */
    this.noApiNavigation = false;

    /**
     * A helper property that tells whether the view has AMF data.
     * @type {boolean}
     * @default false
     */
    this.hasData = false;

    window.addEventListener('api-navigation-selection-changed', this._navChanged);

    document.body.classList.add('api');
  }

  /**
   * Sets default API selection when the view is rendered.
   */
  firstRender() {
    const node = /** @type any */ (document.getElementById('apiList'));
    if (!node) {
      return;
    }
    node.selected = 0;
  }

  /**
   * Handler for the API selection change
   * @param {Event} e
   */
  _apiChanged(e) {
    const node = /** @type AnypointListbox */ (e.target);
    const item = /** @type HTMLElement */ (node.selectedItem);
    const file = item.dataset.src;
    this._loadFile(file);
  }

  /**
   * @param {string} file file name in the demo folder
   */
  async _loadFile(file) {
    const response = await fetch(`./${file}`);
    const data = await response.json();
    this.amf = data;
  }
  
  /**
   * This method to be overridden in child class to handle navigation.
   * @param {CustomEvent} e Dispatched navigation event
   */
  _navChanged(e) {
    const { selected, type } = e.detail;
    // eslint-disable-next-line no-console
    console.log(`Navigation changed. Type: ${type}, selected: ${selected}`);
  }

  /**
   * This method to be overridden in child class to render API options.
   * @return {TemplateResult[]} HTML template for apis dropdown options.
   */
  _apiListTemplate() {
    return [
      ['demo-api', 'Demo API'],
    ].map(([file, label]) => html`
      <anypoint-item data-src="${file}-compact.json">${label} - compact model</anypoint-item>
      <anypoint-item data-src="${file}.json">${label}</anypoint-item>
    `);
  }

  /**
   * @return {TemplateResult|string} Template for API navigation element
   */
  _apiNavigationTemplate() {
    if (this.noApiNavigation) {
      return '';
    }
    return html`
    <api-navigation
      summary
      .amf="${this.amf}"
      ?endpointsOpened="${this.endpointsOpened}"
      ?docsOpened="${this.docsOpened}"
      ?typesOpened="${this.typesOpened}"
      ?securityOpened="${this.securityOpened}"
    ></api-navigation>`;
  }
  
  /**
   * Call this on the top of the `render()` method to render demo navigation
   * @return {TemplateResult} HTML template for demo header
   */
  headerTemplate() {
    const { componentName } = this;
    return html`
    <raml-aware .api="${this.amf}" scope="model"></raml-aware>
    <header>
      ${componentName ? html`<h1 class="api-title">${componentName}</h1>` : ''}
      <anypoint-dropdown-menu
        aria-label="Activate to select demo API"
        aria-expanded="false"
      >
        <label slot="label">Select demo API</label>
        <anypoint-listbox slot="dropdown-content" id="apiList" @selected-changed="${this._apiChanged}">
          ${this._apiListTemplate()}
        </anypoint-listbox>
      </anypoint-dropdown-menu>
      <div class="spacer"></div>
      ${this._viewControlsTemplate()}
    </header>`;
  }

  _render() {
    if (!this.firstRendered) {
      this.firstRendered = true;
      setTimeout(() => this.firstRender());
    }
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
