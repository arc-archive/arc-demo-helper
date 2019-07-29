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
