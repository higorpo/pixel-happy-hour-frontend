import React from 'react';
import ReactDOM from 'react-dom';
import ReactTooltip from 'react-tooltip';
import './index.scss';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ReactTooltip />
  </React.StrictMode>,
  document.getElementById('root')
);