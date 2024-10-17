
import React from "react";
import ReactDOM from 'react-dom/client';
import App from './App';
import PortifolioPage from './Features/Portifolio/Pages';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App>
        <PortifolioPage />
      </App>
    </React.StrictMode>
  );
