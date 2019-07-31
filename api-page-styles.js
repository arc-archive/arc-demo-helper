/* eslint-disable max-len */
import { css } from 'lit-element';
const style = css`
[role="main"].centered {
  max-width: 1100px;
}

api-navigation {
  width: 320px;
  min-width: 320px;
  overflow: auto;
}
body.styled header {
  background-color: #C5E1A5;
  --iron-icon-fill-color: #3E2723;
  --paper-input-container-focus-color: #33691E;
  --paper-input-container-label: {
    color: #3E2723;
  };
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
