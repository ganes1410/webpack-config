import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import DefaultErrorBoundary from './DefaultErrorBoundary';

const Root = () => (
  <React.StrictMode>
    <DefaultErrorBoundary>
      <App />
    </DefaultErrorBoundary>
  </React.StrictMode>
);
ReactDOM.render(<Root />, document.getElementById('app'));
