import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { AuthContextProvider } from './store/auth-context';

import './index.css';

declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: any;
  }
}
// only allow devtools in development
if (
  typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object' &&
  process.env.NODE_ENV !== 'development'
) {
  for (let [key, value] of Object.entries(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = typeof value == 'function' ? () => {} : null;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
