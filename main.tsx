import React from 'react';
import ReactDOM from 'react-dom/client';
import { ArcStateProvider } from './hooks/useArcState';
import App from './app/App';
import './styles/tokens.css';
import './styles/global.css';
import './styles/components.css';
import './styles/hero.css';
import './styles/system.css';
import './styles/information.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ArcStateProvider>
      <App />
    </ArcStateProvider>
  </React.StrictMode>,
);
