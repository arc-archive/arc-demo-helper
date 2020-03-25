import { html, render } from 'lit-html';
import { settings } from '@advanced-rest-client/arc-icons/ArcIcons.js';
import '@anypoint-web-components/anypoint-menu-button/anypoint-menu-button.js';
import '@anypoint-web-components/anypoint-button/anypoint-icon-button.js';
import '@anypoint-web-components/anypoint-switch/anypoint-switch.js';
import './SharedStyles.js';
/**
 * Base class for ARC components demo page.
 *
 * ## Usage
 *
 * ```javascript
 * import { html, render } from 'lit-html';
 * import { DemoPage } from '@advanced-rest-client/arc-demo-helper';
 *
 * class ComponentDemo extends DemoPage {
 *  contentTemplate() {
 *    return html`
 *      return html`<my-component ?narrow="${this.narrow}"></my-component>`;
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
export class DemoPage {
  constructor() {
    this._darkThemeHandler = this._darkThemeHandler.bind(this);
    this._narrowHandler = this._narrowHandler.bind(this);
    this._stylesHandler = this._stylesHandler.bind(this);
    this._toggleMainOption = this._toggleMainOption.bind(this);
    this._demoStateHandler = this._demoStateHandler.bind(this);

    this.initObservableProperties([
      'narrow', 'componentName', 'stylesActive', 'compatibility',
    ]);

    /**
     * A list of demo states to be passed to `arc-interactive-demo` element
     * @type {Array<String>}
     */
    this.demoStates = ['Material', 'Anypoint'];

    /**
     * Whether the demoed component should be rendered in the "narrow" view
     * @type {Boolean}
     * @default false
     */
    this.narrow = false;

    /**
     * Whether view controls should be rendered in the top navigation.
     * @type {Boolean}
     * @default false
     */
    this.renderViewControls = false;

    /**
     * Component name rendered in the header section.
     * @type {String}
     */
    this.componentName = '';

    /**
     * Determines whether the initial render had run and the `firstRender()`
     * function was called.
     *
     * @type {Boolean}
     * @default false
     */
    this.firstRendered = false;

    /**
     * Whether or not the styles should be applied to `body.styled` element.
     * @type {Boolean}
     * @default true
     */
    this.stylesActive = true;

    /**
     * Whether or not the dark theme is active
     * @type {Boolean}
     * @default false
     */
    this.darkThemeActive = false;

    document.body.classList.add('styled');

    const script = document.createElement('script');
    script.src = '../node_modules/web-animations-js/web-animations-next.min.js';
    document.head.appendChild(script);
  }

  /**
   * Helper function to be overriten by child classes. It is called when the view
   * is rendered for the first time.
   */
  firstRender() {
  }

  get darkThemeActive() {
    return this._darkThemeActive;
  }

  set darkThemeActive(value) {
    if (this._darkThemeActive === value || !document.body) {
      return;
    }
    this._darkThemeActive = value;
    if (value) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    this.render();
  }

  /**
   * Creates setters and getters to properties defined in the passed list of properties.
   * Property setter will trigger render function.
   *
   * @param {Array<String>} props List of properties to initialize.
   */
  initObservableProperties(props) {
    props.forEach((item) => {
      Object.defineProperty(this, item, {
        get() {
          return this['_' + item];
        },
        set(newValue) {
          this._setObservableProperty(item, newValue);
        },
        enumerable: true,
        configurable: true
      });
    });
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
  }

  _narrowHandler(e) {
    this.narrow = e.target.checked;
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
   * A handler for the `change` event for an element that has `checked` and `name` properties.
   * This can be used with `anypoint-switch`, `anypoint-checkbox`, and `checkbox` elements.
   *
   * The `name` shoulds correspond to a variable name to be set. The set value is the value
   * of `checked` property read from the event's target.
   *
   * @param {Event} e
   */
  _toggleMainOption(e) {
    const { name, checked } = e.target;
    this[name] = checked;
  }

  _demoStateHandler(e) {
    const { value } = e.detail;
    this.compatibility = value === 1;
    this._updateCompatibility();
  }

  _updateCompatibility() {
    if (this.compatibility) {
      document.body.classList.add('anypoint');
    } else {
      document.body.classList.remove('anypoint');
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
   *
   * @return {TemplateResult} Template to render
   */
  contentTemplate() {
    return html``;
  }

  /**
   * Call this on the top of the `render()` method to render demo navigation
   * @return {TemplateResult} HTML template for demo header
   */
  headerTemplate() {
    const { componentName } = this;
    return html`
    <header>
      ${componentName ? html`<h1 class="api-title">${componentName}</h1>` : ''}
      <div class="spacer"></div>
      ${this._viewControlsTemplate()}
    </header>`;
  }

  _viewControlsTemplate() {
    if (!this.renderViewControls) {
      return '';
    }
    return html`
    <anypoint-menu-button dynamicalign>
      <anypoint-icon-button
        slot="dropdown-trigger"
        aria-label="Press to toggle demo page settings menu"
      >
        <span class="icon">${settings}</span>
      </anypoint-icon-button>
      <div slot="dropdown-content">
        <div class="settings-action-item">
          <anypoint-switch @change="${this._darkThemeHandler}">Toggle dark theme</anypoint-switch>
        </div>
        <div class="settings-action-item">
          <anypoint-switch @change="${this._narrowHandler}">Toggle narrow attribute</anypoint-switch>
        </div>
        <div class="settings-action-item">
          <anypoint-switch checked @change="${this._stylesHandler}">Toggle styles</anypoint-switch>
        </div>
        ${this._demoViewControlsTemplate()}
      </div>
    </anypoint-menu-button>`;
  }

  /**
   * Override this function to add some custom custom controls to the
   * view controls dropdown.
   * @return {TemplateResult} HTML template for demo header
   */
  _demoViewControlsTemplate() {
    return '';
  }

  /**
   * The main render function. Sub clases should not override this method.
   * Override `_render()` instead.
   *
   * The function calls `_render()` in a timeout so it is safe to call this
   * multiple time in the same event loop.
   */
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
    if (!this.firstRendered) {
      this.firstRendered = true;
      setTimeout(() => this.firstRender());
    }
    render(html`
      ${this.headerTemplate()}
      <section role="main" class="vertical-section-container centered main">
        ${this.contentTemplate()}
      </section>`, document.querySelector('#demo'));
  }
}
