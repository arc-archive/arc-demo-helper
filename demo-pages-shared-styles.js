/* eslint-disable max-len */
import { css } from 'lit-element';
const style = css`
body {
  font-family: 'Roboto', 'Noto', sans-serif;
  font-size: 14px;
  margin: 0;
  padding: 24px;
  background-color: #fafafa;
}

.horizontal-section-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.vertical-section-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.centered {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.card {
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
              0 1px 10px 0 rgba(0, 0, 0, 0.12),
              0 2px 4px -1px rgba(0, 0, 0, 0.4);
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  box-sizing: border-box;
  background-color: #fff;
}

header {
  padding: 12px 24px;
  background-color: #2196F3;
  color: #000;
  display: flex;
  align-items: center;
  --iron-icon-fill-color: #000;
  --paper-input-container-focus-color: #33691E;
  --paper-input-container-label: {
    color: #3E2723;
  };
}

header h1 {
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -.012em;
  line-height: 32px;
}

.spacer {
  flex: 1;
}

.settings-action-item {
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
}

body.styled {
  margin: 0;
  padding: 0;
  background-color: #fff;
  height: 100vh;
  --primary-color: #00A2DF;
  --arc-font-body1-font-size: 14px;
  --arc-font-body1-font-weight: 400;
  --arc-font-body1-line-height: 20px;
  --arc-font-code-family: 'Roboto Mono', 'Consolas', 'Menlo', monospace;
  --code-background-color: #f5f2f0;
}

body.styled.dark {
  background-color: #424242;
  height: 100vh;
  color: #fff;
  --primary-color: #2196f3;
  --primary-text-color: #fff;
  --paper-toggle-button-label-color: #fff;
}

body.styled.dark arc-demo-helper {
  --arc-demo-helper-code-container-background-color: #263238;
  --code-background-color: #263238;
  --code-type-boolean-value-color: #F07178;
  --code-type-number-value-color: #F78C6A;
  --code-type-text-value-color: #C3E88D;
  --code-property-value-color: #F07178;
  --code-operator-value-background-color: transparent;
  --arc-demo-helper-demo-background-color: #263238;
}

body.styled.dark .card {
  background-color: #424242;
}

body.styled.dark header {
  background-color: #212121;
  color: #fff;
  --iron-icon-fill-color: #fff;
  --paper-input-container-color: rgba(255, 255, 255, 0.84);
}

body.styled.dark .settings-action-item {
  background-color: #212121;
}

.demo-container {
  flex: 1;
}
`;
try {
  document.adoptedStyleSheets = document.adoptedStyleSheets.concat(style.styleSheet);
} catch (_) {
  /* istanbul ignore next */
  {
    const s = document.createElement('style');
    s.type = 'text/css';
    s.innerHTML = style.cssText;
    document.getElementsByTagName('head')[0].appendChild(s);
  }
}

const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.crossOrigin = 'anonymous';
link.href =
  'https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|Roboto:400,300,300italic,400italic,500,500italic,700,700italic';
document.head.appendChild(link);
