import { html, fixture, expect } from '@open-wc/testing';

import '../src/arc-demo-helper.js';
import './simple-button.js';

describe('display', () => {
  let emptyHeight;

  beforeEach(async () => {
    const element = await fixture('<arc-demo-helper></arc-demo-helper>');
    emptyHeight = element.getBoundingClientRect().height;
  });

  it('can render native elements', async () => {
    const element = await fixture('<arc-demo-helper><template><input disabled></template></arc-demo-helper>');
    const rect = element.getBoundingClientRect();
    expect(rect.height).to.be.greaterThan(emptyHeight);

    // The demo is rendered in the light dom, so it should exist, and
    // it should respect the demo element's attributes, and not make up
    // new ones.
    const input = element.querySelector('input')
    expect(input).to.be.ok;
    expect(input.disabled).to.be.true;
    expect(element.markdown).to.be.equal('<input disabled>');
  });

  it('can render custom elements', async () => {
    const element = await fixture(`<arc-demo-helper>
      <template>
        <simple-button value="batman"></simple-button>
      </template>
    </arc-demo-helper>`);
    const rect = element.getBoundingClientRect();
    expect(rect.height).to.be.greaterThan(emptyHeight);

    // The demo is rendered in the light dom, so it should exist, and
    // it should respect the demo element's attributes, and not make up
    // new ones.
    const button = element.querySelector('simple-button')
    expect(button).to.be.ok;
    expect(button.value).to.be.equal('batman');
    expect(element.markdown).to.be.equal('\n<simple-button value="batman"></simple-button>\n');
  });
});

describe('_copyToClipboard', () => {
  it('Calls _copyToClipboard()', async () => {
    const element = await fixture('<arc-demo-helper><template><input></template></arc-demo-helper>');
    const button = element.shadowRoot.querySelector('#copyButton');
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    button.dispatchEvent(event);
    // LitElement wraps event listeners so sinon won't detect the actual call of
    // the function. When the function was executed then the button label is different
    // then default one
    expect(button.innerText.toLowerCase()).not.to.be.equal('copy');
  });
});

describe('_resetCopyButtonState', () => {
  it('Resets button state', async () => {
    const element = await fixture('<arc-demo-helper><template><input></template></arc-demo-helper>');
    const button = element.shadowRoot.querySelector('#copyButton');
    button.innerText = 'test';
    element._resetCopyButtonState();
    expect(button.innerText.toLowerCase()).to.be.equal('copy');
  });
});

describe('unindent()', () => {
  it('Returns when no text', async () => {
    const element = await fixture('<arc-demo-helper></arc-demo-helper>');
    const txt = '';
    const result = element.unindent(txt);
    expect(result).to.be.equal(txt);
  });

  it('Removes indent', async () => {
    const element = await fixture('<arc-demo-helper></arc-demo-helper>');
    const txt = `
  test
    test
  test
`;
    const result = element.unindent(txt);
    expect(result).to.be.equal('\ntest\n  test\ntest\n');
  });
});
