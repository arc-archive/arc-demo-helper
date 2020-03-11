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
    this.firstRendered = false;
    this._darkThemeHandler = this._darkThemeHandler.bind(this);
    this._narrowHandler = this._narrowHandler.bind(this);
    this._stylesHandler = this._stylesHandler.bind(this);
    this._toggleMainOption = this._toggleMainOption.bind(this);

    this.initObservableProperties([
      'narrow', 'componentName', 'stylesActive', 'darkThemeActive'
    ]);

    this._narrow = false;
    this.renderViewControls = false;
    // This is rendered in the header section
    this._componentName = '';

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
    if (e.target.checked) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
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
      </div>
    </anypoint-menu-button>`;
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
