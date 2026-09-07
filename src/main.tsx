import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { AnimationProvider } from './AnimationContext.tsx';
import './index.css';

import AdminApp from './admin/AdminApp.tsx';

const path = window.location.pathname;

if (path.startsWith('/admin')) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AdminApp />
    </StrictMode>,
  );
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AnimationProvider>
        <App />
      </AnimationProvider>
    </StrictMode>,
  );
}
