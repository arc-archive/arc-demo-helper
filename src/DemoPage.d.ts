// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

import {TemplateResult} from 'lit-html';

export {DemoPage};

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
declare class DemoPage {

  /**
   * A list of demo states to be passed to `arc-interactive-demo` element
   */
  demoStates: Array<String>;

  /**
   * Whether the demoed component should be rendered in the "narrow" view
   */
  narrow: Boolean;

  /**
   * Whether view controls should be rendered in the top navigation.
   */
  renderViewControls: Boolean;

  /**
   * Component name rendered in the header section.
   */
  componentName: String;

  /**
   * Determines whether the initial render had run and the `firstRender()`
   * function was called.
   */
  firstRendered: Boolean;

  /**
   * Whether or not the styles should be applied to `body.styled` element.
   */
  stylesActive: Boolean;

  /**
   * Whether or not the dark theme is active
   */
  darkThemeActive: Boolean;
  constructor();

  /**
   * Helper function to be overriten by child classes. It is called when the view
   * is rendered for the first time.
   */
  firstRender(): void;

  /**
   * Creates setters and getters to properties defined in the passed list of properties.
   * Property setter will trigger render function.
   *
   * @param props List of properties to initialize.
   */
  initObservableProperties(props: Array<String>): void;
  _setObservableProperty(prop: any, value: any): void;
  _darkThemeHandler(e: any): void;
  _narrowHandler(e: any): void;
  _stylesHandler(e: any): void;

  /**
   * A handler for the `change` event for an element that has `checked` and `name` properties.
   * This can be used with `anypoint-switch`, `anypoint-checkbox`, and `checkbox` elements.
   *
   * The `name` shoulds correspond to a variable name to be set. The set value is the value
   * of `checked` property read from the event's target.
   */
  _toggleMainOption(e: CustomEvent): void;
  _demoStateHandler(e: CustomEvent): void;
  _updateCompatibility(): void;

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
   * @returns Template to render
   */
  contentTemplate(): TemplateResult;

  /**
   * Call this on the top of the `render()` method to render demo navigation
   *
   * @returns HTML template for demo header
   */
  headerTemplate(): TemplateResult;
  _viewControlsTemplate(): TemplateResult|string;

  /**
   * Override this function to add some custom custom controls to the
   * view controls dropdown.
   *
   * @returns HTML template for demo header
   */
  _demoViewControlsTemplate(): TemplateResult;

  /**
   * The main render function. Sub clases should not override this method.
   * Override `_render()` instead.
   *
   * The function calls `_render()` in a timeout so it is safe to call this
   * multiple time in the same event loop.
   */
  render(): void;
  _render(): void;
}
