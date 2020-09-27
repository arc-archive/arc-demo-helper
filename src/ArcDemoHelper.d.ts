import {TemplateResult, CSSResult, LitElement} from 'lit-element';

export {ArcDemoHelper};

declare class ArcDemoHelper extends LitElement {
  static readonly styles: CSSResult[];
  /**
   * @attribute
   */
  markdown: string;
  _markdown: string;
  _firstUpdated: boolean;
  /**
   * @attribute
   */
  ignoreSlotChange: boolean;

  constructor();
  connectedCallback(): void;
  disconnectedCallback(): void;
  firstUpdated(): void;
  _registerSlotListener(): void;
  _slotChangeHandler(): void;
  _updateContent(): void;
  unindent(text: string): string;
  _highlight(code: string): void;
  _copyToClipboard(): boolean;
  _resetCopyButtonState(): void;
  render(): TemplateResult;
}
