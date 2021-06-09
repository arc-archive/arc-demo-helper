import {TemplateResult} from 'lit-html';

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
 * completely un-styled component.
 *
 * Dark theme should be supported in the demo page. Put styles related to dark theme
 * under `body.styled.dark` selector. When the user chooses this option it renders content
 * in dark theme.
 */
export declare class DemoPage {

  /**
   * A list of demo states to be passed to `arc-interactive-demo` element
   * @attribute
   */
  demoStates: string[];

  /**
   * Whether the demoed component should be rendered in the "narrow" view
   * @attribute
   */
  narrow: boolean;

  /**
   * Whether view controls should be rendered in the top navigation.
   * @attribute
   */
  renderViewControls: boolean;

  /**
   * Component name rendered in the header section.
   * @attribute
   */
  componentName: string;

  /**
   * Determines whether the initial render had run and the `firstRender()`
   * function was called.
   * @attribute
   */
  firstRendered: boolean;

  /**
   * Whether or not the styles should be applied to `body.styled` element.
   * @attribute
   */
  stylesActive: boolean;

  /**
   * Whether or not the dark theme is active
   * @attribute
   */
  darkThemeActive: boolean;
  constructor();

  /**
   * Helper function to be overridden by child classes. It is called when the view
   * is rendered for the first time.
   */
  firstRender(): void;

  /**
   * Creates setters and getters to properties defined in the passed list of properties.
   * Property setter will trigger render function.
   *
   * @param props List of properties to initialize.
   */
  initObservableProperties(props: string[]): void;

   /**
   * Initializes media queries for dark system theme.
   */
  initMediaQueries(): void;
  _setObservableProperty(prop: string, value: any): void;
  _darkThemeHandler(e: CustomEvent): void;
  _narrowHandler(e: CustomEvent): void;
  _stylesHandler(e: CustomEvent): void;

  /**
   * A handler for the `change` event for an element that has `checked` and `name` properties.
   * This can be used with `anypoint-switch`, `anypoint-checkbox`, and `checkbox` elements.
   *
   * The `name` should correspond to a variable name to be set. The set value is the value
   * of `checked` property read from the event's target.
   */
  _toggleMainOption(e: CustomEvent): void;
  /**
   * A handler for the `change` event for the demo state
   */
  _demoStateHandler(e: CustomEvent): void;
  _updateCompatibility(): void;
  _mediaQueryHandler(e: MediaQueryListEvent): void;

  /**
   * Call this on the top of the `render()` method to render demo navigation
   *
   * @returns HTML template for demo header
   */
  headerTemplate(): TemplateResult;

  /**
   * @return Template for the view controls
   */
  _viewControlsTemplate(): TemplateResult|string;

  /**
   * Override this function to add some custom custom controls to the
   * view controls dropdown.
   *
   * @returns HTML template for demo header
   */
  _demoViewControlsTemplate(): TemplateResult;

  /**
   * Abstract method. When not overriding `render()` method you can use
   * this function to render content inside the standard API components layout.
   *
   * ```
   * contentTemplate() {
   *  return html`<p>Demo content</p>`;
   * }
   * ```
   *
   * @returns Template to render
   */
  contentTemplate(): TemplateResult;

  /**
   * The page render function. Usually you don't need to use it.
   * It renders the header template, main section, and the content.
   */
   pageTemplate(): TemplateResult;

  /**
   * The main render function. Sub classes should not override this method.
   * Override `_render()` instead.
   *
   * The function calls `_render()` in a timeout so it is safe to call this
   * multiple time in the same event loop.
   */
  render(): void;
  _render(): void;
}
