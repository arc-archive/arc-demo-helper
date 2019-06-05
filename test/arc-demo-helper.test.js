import { fixture, assert } from '@open-wc/testing';

import '../arc-demo-helper.js';
import './simple-button.js';

describe('Rendering content', () => {
  let emptyHeight;

  beforeEach(async () => {
    const element = await fixture('<arc-demo-helper></arc-demo-helper>');
    emptyHeight = element.getBoundingClientRect().height;
  });

  it('can render native elements', async () => {
    const element = await fixture('<arc-demo-helper><template><input disabled></template></arc-demo-helper>');
    const rect = element.getBoundingClientRect();
    assert.isAbove(rect.height, emptyHeight);

    // The demo is rendered in the light dom, so it should exist, and
    // it should respect the demo element's attributes, and not make up
    // new ones.
    const input = element.querySelector('input');
    assert.ok(input);
    assert.isTrue(input.disabled);
    assert.equal(element.markdown, '<input disabled>');
  });

  it('can render custom elements', async () => {
    const element = await fixture(`<arc-demo-helper>
      <template>
        <simple-button value="batman"></simple-button>
      </template>
    </arc-demo-helper>`);
    const rect = element.getBoundingClientRect();
    assert.isAbove(rect.height, emptyHeight);

    // The demo is rendered in the light dom, so it should exist, and
    // it should respect the demo element's attributes, and not make up
    // new ones.
    const button = element.querySelector('simple-button');
    assert.ok(button);
    assert.equal(button.value, 'batman');
    assert.equal(element.markdown, '\n<simple-button value="batman"></simple-button>\n');
  });

  it('Won\'t render when no template', async () => {
    const element = await fixture(`<arc-demo-helper>
      <simple-button value="batman"></simple-button>
    </arc-demo-helper>`);
    assert.isUndefined(element.markdown);
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
    assert.notEqual(button.innerText.toLowerCase(), 'copy');
  });
});

describe('_resetCopyButtonState', () => {
  it('Resets button state', async () => {
    const element = await fixture('<arc-demo-helper><template><input></template></arc-demo-helper>');
    const button = element.shadowRoot.querySelector('#copyButton');
    button.innerText = 'test';
    element._resetCopyButtonState();
    assert.equal(button.innerText.toLowerCase(), 'copy');
  });
});

describe('unindent()', () => {
  it('Returns when no text', async () => {
    const element = await fixture('<arc-demo-helper></arc-demo-helper>');
    const txt = '';
    const result = element.unindent(txt);
    assert.equal(result, txt);
  });

  it('Removes indent', async () => {
    const element = await fixture('<arc-demo-helper></arc-demo-helper>');
    const txt = `
  test
    test
  test
`;
    const result = element.unindent(txt);
    assert.equal(result, '\ntest\n  test\ntest\n');
  });
});
