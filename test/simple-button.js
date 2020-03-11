import { html, css, LitElement } from 'lit-element';

class SimpleButton extends LitElement {
  static get styles() {
    return css`:host {
        display: inline-block;
        padding: 5px 10px;
        background: var(--button-background, white);
        line-height: 1.2;
        border: 2px solid var(--button-border, #ccc);
        border-radius: 3px;
      }`;
  }

  static get properties() {
    return {
      value: { type: String }
    };
  }

  render() {
    return html`<div>${this.value}</div>`;
  }
}
window.customElements.define('simple-button', SimpleButton);
