import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './components/Auth/AuthContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.register({
  onSuccess: () => {
    console.log('App is ready for offline use.');
  },
  onUpdate: (registration) => {
    // Notify user of update
    const shouldUpdate = window.confirm(
      'A new version of the app is available. Would you like to update now?'
    );
    if (shouldUpdate && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  },
});

