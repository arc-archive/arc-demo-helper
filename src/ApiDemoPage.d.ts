// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

import {TemplateResult} from 'lit-html';

import {AmfHelperMixin} from '@api-components/amf-helper-mixin/amf-helper-mixin.js';

import {DemoPage} from './DemoPage.js';

export {ApiDemoPage};

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
declare class ApiDemoPage extends AmfHelperMixin(DemoPage) {

  /**
   * When set the endpoint section in navigation is opened by default.
   */
  endpointsOpened: Boolean|null;

  /**
   * When set the documentation section in navigation is opened by default.
   */
  docsOpened: Boolean|null;

  /**
   * When set the types section in navigation is opened by default.
   */
  typesOpened: Boolean|null;

  /**
   * When set the security section in navigation is opened by default.
   */
  securityOpened: Boolean|null;

  /**
   * AMF model read from the API model file downloaded aftwer initialization.
   */
  amf: Array<object|null>|object|null;

  /**
   * When set the API Navigation element won't be rendered.
   */
  noApiNativation: Boolean|null;

  /**
   * A helper property that tells whether the view has AMF data.
   */
  hasData: Boolean|null;
  constructor();

  /**
   * Sets default API selection when the view is rendered.
   */
  firstRender(): void;
  _apiChanged(e: Event): void;
  _loadFile(file: any): any;

  /**
   * This method to be overriten in child class to handle navigation.
   *
   * @param e Dispatched navigation event
   */
  _navChanged(e: CustomEvent|null): void;

  /**
   * This method to be overriten in child class to render API options.
   *
   * @returns HTML template for apis dropdown options.
   */
  _apiListTemplate(): Array<TemplateResult>;
  _apiNavigationTemplate(): TemplateResult|string;

  /**
   * Call this on the top of the `render()` method to render demo navigation
   *
   * @returns HTML template for demo header
   */
  headerTemplate(): TemplateResult|null;
  _render(): void;
}
