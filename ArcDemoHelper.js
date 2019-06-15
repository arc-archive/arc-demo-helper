import { html, css, LitElement } from 'lit-element';
import './demo-pages-shared-styles.js';
import 'prismjs/prism.js';
import 'prismjs/components/prism-markdown.min.js';

let firstUpdated = false;
let ignoreSlotChange = false;

export class ArcDemoHelper extends LitElement {
  static get prismStyles() {
    return css `/**
     * prism.js default theme for JavaScript, CSS and HTML
     * Based on dabblet (http://dabblet.com)
     * @author Lea Verou
     */
    code[class*="language-"],
    pre[class*="language-"] {
      white-space: pre-wrap;
      word-spacing: normal;
      word-break: break-all;
      word-wrap: break-word;
      line-height: 1.5;
      -moz-tab-size: 4;
      -o-tab-size: 4;
      tab-size: 4;
      hyphens: auto;
      background-color: var(--prism-container-background-color);
      display: block;
      font-family: var(--arc-font-code-family, monospace);
      font-size: var(--arc-font-code-font-size, 10pt);
    }
    pre[class*="language-"]::-moz-selection,
    pre[class*="language-"]::-moz-selection,
    code[class*="language-"]::-moz-selection,
    code[class*="language-"]::-moz-selection {
      text-shadow: none;
      background: var(--prism-container-selection-background-color, #b3d4fc);
    }
    pre[class*="language-"]::selection,
    pre[class*="language-"]::selection,
    code[class*="language-"]::selection,
    code[class*="language-"]::selection {
      text-shadow: none;
      background: var(--prism-container-selection-background-color, #b3d4fc);
    }
    @media print {
      code[class*="language-"],
      pre[class*="language-"] {
        text-shadow: none;
      }
    }
    /* Code blocks */
    pre[class*="language-"] {
      padding: 1em;
      margin: .5em 0;
      overflow: auto;
    }
    :not(pre) > code[class*="language-"],
    pre[class*="language-"] {
      background: var(--prism-container-pre-background-color, #f5f2f0);
    }
    /* Inline code */
    :not(pre) > code[class*="language-"] {
      padding: .1em;
      border-radius: .3em;
      white-space: normal;
    }
    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: var(--code-token-comment-value-color, slategray);
    }
    .token.punctuation {
      color: var(--code-punctuation-value-color, #999);
    }
    .namespace {
      opacity: .7;
    }
    .token.property,
    .token.tag,
    .token.constant,
    .token.symbol,
    .token.deleted {
      color: var(--code-property-value-color, #905);
    }
    .token.number {
      color: var(--code-type-number-value-color, #905);
    }
    .token.boolean {
      color: var(--code-type-boolean-value-color, #905);
    }
    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted {
      color: var(--code-type-text-value-color, #690);
    }
    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string {
      color: var(--code-operator-value-color, #a67f59);
      background: var(--code-operator-value-background-color, hsla(0, 0%, 100%, .5));
    }
    .token.atrule,
    .token.attr-value,
    .token.keyword {
      color: var(--code-keyword-value-color, #07a);
    }
    .token.function {
      color: var(--code-function-value-color, #DD4A68);
    }
    .token.regex,
    .token.important,
    .token.variable {
      color: var(--code-variable-value-color, #e90);
    }
    .token.important,
    .token.bold {
      font-weight: bold;
    }
    .token.italic {
      font-style: italic;
    }
    .token.entity {
      cursor: help;
    }`;
  }

  static get styles() {
    return [css`
    :host {
      display: block;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                  0 1px 5px 0 rgba(0, 0, 0, 0.12),
                  0 3px 1px -2px rgba(0, 0, 0, 0.2);
      margin-bottom: 40px;
    }

    .demo {
      display: block;
      border-bottom: 1px solid #e0e0e0;
      background-color: white;
      margin: 0;
      padding: 20px;
    }

    .code-container {
      margin: 0;
      background-color: #f5f5f5;
      font-size: 13px;
      overflow: auto;
      position: relative;
      padding: 0 20px;
    }

    .code {
      padding: 20px;
      margin: 0;
      background-color: var(--google-grey-100);
      font-size: 13px;
      overflow: auto;

      display: block;
      white-space: pre-wrap;
    }

    .code > pre {
      margin: 0;
      padding: 0 0 10px 0;
    }

    #copyButton {
      position: absolute;
      top: 0;
      right: 0px;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
      background: #e0e0e0;
    }
    `, ArcDemoHelper.prismStyles];
  }

  set markdown(value) {
    this._markdown = value;
    this._highlight(value);
  }

  get markdown() {
    return this._markdown;
  }

  constructor() {
    super();
    this._slotChangeHandler = this._slotChangeHandler.bind(this);
  }

  render() {
    return html`
    <div class="demo">
      <slot id="content"></slot>
      <div id="demoContent"></div>
    </div>
    <div class="code-container">
      <code class="code"></code>
      <button id="copyButton" title="copy to clipboard" @click="${this._copyToClipboard}">Copy</button>
    </div>
    `;
  }

  firstUpdated() {
    firstUpdated = true;
    this._registerSlotListener();
  }

  connectedCallback() {
    super.connectedCallback();
    if (!firstUpdated || ignoreSlotChange) {
      return;
    }
    this._registerSlotListener();
  }

  _registerSlotListener() {
    const slot = this.shadowRoot.querySelector('#content');
    if (!slot) {
      return;
    }
    slot.addEventListener('slotchange', this._slotChangeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    const slot = this.shadowRoot.querySelector('#content');
    slot.removeEventListener('slotchange', this._slotChangeHandler);
  }

  _slotChangeHandler() {
    this._updateContent();
  }

  _updateContent() {
    const slot = this.shadowRoot.querySelector('#content');
    const template = slot.assignedNodes().find((node) => node.nodeName === 'TEMPLATE');
    if (!template) {
      return;
    }
    let snippet = this.unindent(template.innerHTML);
    // Hack: In safari + shady dom, sometime we get an empty 'class' attribute.
    // if we do, delete it.
    snippet = snippet.replace(/ class=""/g, '');

    // Boolean properties are displayed as checked="", so remove the ="" bit.
    snippet = snippet.replace(/=""/g, '');

    this.markdown = snippet;
    slot.removeEventListener('slotchange', this._slotChangeHandler);
    this.appendChild(document.importNode(template.content, true));
    ignoreSlotChange = true;
  }

  unindent(text) {
    if (!text) {
      return text;
    }
    const lines = text.replace(/\t/g, '  ').split('\n');
    const indent = lines.reduce(function(prev, line) {
      if (/^\s*$/.test(line)) {
        return prev; // Completely ignore blank lines.
      }
      const lineIndent = line.match(/^(\s*)/)[0].length;
      if (prev === null) {
        return lineIndent;
      }
      return lineIndent < prev ? /* istanbul ignore next */ lineIndent : prev;
    }, null);

    return lines.map((l) => l.substr(indent)).join('\n');
  }

  _highlight(code) {
    /* global Prism */
    const grammar = Prism.languages.markdown;
    const lang = 'markdown';
    const env = {
      code: code,
      grammar,
      language: lang
    };
    Prism.hooks.run('before-highlight', env);
    const result = Prism.highlight(code, grammar, lang);
    this.shadowRoot.querySelector('code').innerHTML = result;
  }

  _copyToClipboard() {
    const button = this.shadowRoot.querySelector('#copyButton');
    const snipRange = document.createRange();
    snipRange.selectNodeContents(this.shadowRoot.querySelector('.code'));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(snipRange);
    let result = false;
    try {
      result = document.execCommand('copy');
      button.textContent = 'done';
    } catch (err) {
      // Copy command is not available
      /* istanbul ignore next: It is really hard to get here */
      {
        console.warn(err);
        button.textContent = 'error';
      }
    }

    // Return to the copy button after a second.
    setTimeout(this._resetCopyButtonState.bind(this), 1000);

    selection.removeAllRanges();
    return result;
  }

  _resetCopyButtonState() {
    this.shadowRoot.querySelector('#copyButton').textContent = 'copy';
  }
}
