import { injectGlobal } from 'emotion';

injectGlobal`
  body, html {
    margin: 0;
    padding: 0;
  }
  body {
    background: #0f0f0f;
    padding: 8px 4px;
  }

  body * {
    font-family: 'Roboto', sans-serif;
  }
`;