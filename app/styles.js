import { injectGlobal } from 'react-emotion';

injectGlobal`
  body, html {
    margin: 0;
    padding: 0;
  }
  body {
    background: #2F2FA2;
    padding: 8px 4px;
  }

  body * {
    font-family: 'Roboto', sans-serif;
  }
`;