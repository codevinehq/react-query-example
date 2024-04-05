import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('@react-query-example/api/mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 100, // Don't refetch in same render cycle (100ms)
    },
  },
});

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );
});
