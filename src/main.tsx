import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LoaderProvider } from './components/GlobalLoaderContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoaderProvider>
      <App />
    </LoaderProvider>
  </StrictMode>
);
