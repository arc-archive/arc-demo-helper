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
h1.api-title {
  margin-right: 12px;
}

body.styled.dark {
  --code-background-color: #263238;
  --code-type-boolean-value-color: #F07178;
  --code-type-number-value-color: #F78C6A;
  --code-type-text-value-color: #C3E88D;
  --code-property-value-color: #F07178;
  --code-operator-value-background-color: transparent;
}

body.styled.dark api-navigation {
  --http-method-label-get-background-color: rgb(0, 128, 0);
  --http-method-label-get-color: #fff;
  --http-method-label-post-background-color: rgb(33, 150, 243);
  --http-method-label-post-color: #fff;
  --http-method-label-put-background-color: rgb(255, 165, 0);
  --http-method-label-put-color: fff;
  --http-method-label-delete-background-color: rgb(244, 67, 54);
  --http-method-label-delete-color: fff;
  --iron-icon-fill-color: #fff;
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
