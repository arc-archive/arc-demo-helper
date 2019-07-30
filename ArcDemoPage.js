import { html, render } from 'lit-html';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import './demo-pages-shared-styles.js';
/**
 * Base class for ARC components demo page.
 *
 * ## Usage
 *
 * ```javascript
 * import { html, render } from 'lit-html';
 * import { ArcDemoPage } from '@advanced-rest-client/arc-demo-helper/ArcDemoPage.js';
 *
 * class ComponentDemo extends ArcDemoPage {
 *  contentTemplate() {
 *    return html`
 *      return html`<my-component ?narrow="${this.narrowActive}"></my-component>`;
 *    `;
 *  }
 * }
 * const instance = new ComponentDemo();
 * instance.render();
 * ```
 *
 * ## Working with styles.
 *
 * Styles are set on `body.styled` element. Add any component related styles to this
 * selected as the user can choose to disable any styling from the header options.
 * In this case the class `styled` is removed from the body and the user should see
 * completely unstyled component.
 *
 * Dark theme should be supported in the demo page. Put styles related to dark theme
 * under `body.styled.dark` selector. When the user chooses this option it renders content
 * in dark theme.
 */
export class ArcDemoPage {
  constructor() {
    this._darkThemeHandler = this._darkThemeHandler.bind(this);
    this._narrowHandler = this._narrowHandler.bind(this);
    this._stylesHandler = this._stylesHandler.bind(this);

    this._narrowActive = false;
    this.renderViewControls = true;
    // This is rendered in the header section
    this._componentName = '';

    document.body.classList.add('styled');
    const script = document.createElement('script');
    script.src = '../node_modules/web-animations-js/web-animations-next.min.js';
    document.head.appendChild(script);
  }

  get narrowActive() {
    return this._narrowActive;
  }

  set narrowActive(value) {
    this._setObservableProperty('narrowActive', value);
  }

  get componentName() {
    return this._componentName;
  }

  set componentName(value) {
    this._setObservableProperty('componentName', value);
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
   * Returns the template for the header action controls.
   *
   * Override this to add different controls.
   *
   * @return {Object} HTML template
   */
  headerControlsTemplate() {
    return html`<paper-menu-button dynamic-align>
    <paper-icon-button icon="settings" slot="dropdown-trigger"></paper-icon-button>
    <div slot="dropdown-content">
      ${this._headerControlsTemplate()}
    </div>`;
  }
  /**
   * Returns list of options for header controld
   *
   * Override this to add different controls:
   *
   * ```javascript
   * _headerControlsTemplate() {
   *  return html`
   *  ${super._headerControlsTemplate()}
   *  <div class="settings-action-item">
   *    <paper-toggle-button @checked-changed="${this._otherHandler}">Other option</paper-toggle-button>
   *  </div>`;
   * }
   * ```
   *
   * @return {Object} HTML template
   */
  _headerControlsTemplate() {
    return html`<div class="settings-action-item">
      <paper-toggle-button @checked-changed="${this._darkThemeHandler}">Toggle dark theme</paper-toggle-button>
    </div>
    <div class="settings-action-item">
      <paper-toggle-button @checked-changed="${this._narrowHandler}">Toggle narrow attribute</paper-toggle-button>
    </div>
    <div class="settings-action-item">
      <paper-toggle-button checked @checked-changed="${this._stylesHandler}">Toggle styles</paper-toggle-button>
    </div>`;
  }
  /**
   * Call this on the top of the `render()` method to render demo navigation
   * @return {Object} HTML template for demo header
   */
  headerTemplate() {
    const { componentName } = this;
    return html`
    <header>
      <h1>${componentName}</h1>
      <div class="spacer"></div>
      ${this.renderViewControls ? this.headerControlsTemplate() : undefined}
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
      <section role="main" class="vertical-section-container centered main">
        ${this.contentTemplate()}
      </section>`, document.querySelector('#demo'));
  }
}
