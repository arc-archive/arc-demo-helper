import {TemplateResult} from 'lit-html';
import {AmfHelperMixin} from '@api-components/amf-helper-mixin/amf-helper-mixin.js';
import {DemoPage} from './DemoPage.js';

export declare interface ApiDemoPage extends AmfHelperMixin, DemoPage {
}

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
export declare class ApiDemoPage {

  /**
   * When set the endpoint section in navigation is opened by default.
   * @attribute
   */
  endpointsOpened: boolean;

  /**
   * When set the documentation section in navigation is opened by default.
   * @attribute
   */
  docsOpened: boolean;

  /**
   * When set the types section in navigation is opened by default.
   * @attribute
   */
  typesOpened: boolean;

  /**
   * When set the security section in navigation is opened by default.
   * @attribute
   */
  securityOpened: boolean;

  /**
   * AMF model read from the API model file downloaded after initialization.
   */
  amf: any;

  /**
   * When set the API Navigation element won't be rendered.
   * @attribute
   */
  noApiNavigation: boolean;

  /**
   * A helper property that tells whether the view has AMF data.
   * @attribute
   */
  hasData: boolean;

  /**
   * Sets default API selection when the view is rendered.
   */
  firstRender(): void;

  /**
   * Handler for the API selection change
   */
  _apiChanged(e: Event): void;

  /**
   * @param file file name in the demo folder
   */
  _loadFile(file: string): Promise<void>;

  /**
   * This method to be overridden in child class to handle navigation.
   * @param e Dispatched navigation event
   */
  _navChanged(e: CustomEvent): void;

  /**
   * This method to be overridden in child class to render API options.
   * @return HTML template for apis dropdown options.
   */
  _apiListTemplate(): TemplateResult[];

  /**
   * @return Template for API navigation element
   */
  _apiNavigationTemplate(): TemplateResult|string;

  /**
   * Call this on the top of the `render()` method to render demo navigation
   *
   * @returns HTML template for demo header
   */
  headerTemplate(): TemplateResult;
  _render(): void;
}
