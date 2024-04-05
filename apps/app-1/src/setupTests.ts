import '@testing-library/jest-dom/vitest';

import queryClientTest from '../test/queryClientTest';
import { db as settingsDB } from '@react-query-example/api/settings/mock';
import { server } from './mocks/server';

// Establish API mocking before all tests.
beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error',
  })
);

// Reset any request handlers that we may add during the tests, so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  settingsDB.reset();
  queryClientTest.clear();
});

// Clean up after the tests are finished.
afterAll(() => server.close());
