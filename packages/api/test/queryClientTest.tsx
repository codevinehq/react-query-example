import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClientTest = new QueryClient({
  // logger: {
  //   log: console.log,
  //   warn: console.warn,
  //   // ✅ no more errors on the console for tests
  //   error: process.env.NODE_ENV === "test" ? () => {} : console.error,
  // },
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClientTest;

export const QueryProvider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClientTest}>{children}</QueryClientProvider>
);
