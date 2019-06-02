/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   src/ArcDemoHelper.js
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

import {html, css, LitElement} from 'lit-element';

export {ArcDemoHelper};

declare class ArcDemoHelper extends LitElement {
  markdown: any;
  constructor();
  connectedCallback(): void;
  disconnectedCallback(): void;
  firstUpdated(): void;
  render(): any;
  _registerSlotListener(): void;
  _slotChangeHandler(): void;
  _updateContent(): void;
  unindent(text: any): any;
  _highlight(code: any): void;
  _copyToClipboard(): any;
  _resetCopyButtonState(): void;
}
