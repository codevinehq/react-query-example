import { renderHook, waitFor } from '@testing-library/react';
import { QueryProvider } from '../../test/queryClientTest';

import { useModifySettings, useSettings } from './hooks';
import { defaultItems } from './mock';

describe('Settings', () => {
  describe('hooks', () => {
    test('useSettings', async () => {
      const { result } = renderHook(() => useSettings(defaultItems[0].id), {
        wrapper: QueryProvider,
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(defaultItems[0]);
    });
    test('useModifySettings', async () => {
      const { result } = renderHook(() => useModifySettings(defaultItems[0].id), {
        wrapper: QueryProvider,
      });
      const { result: get } = renderHook(() => useSettings(defaultItems[0].id), {
        wrapper: QueryProvider,
      });

      await result.current.mutateAsync({
        companyId: defaultItems[0].id,
        settings: {
          name: 'Frank',
        },
      });

      await waitFor(() => expect(get.current.isSuccess).toBe(true));

      expect(get.current.data).toEqual({
        ...defaultItems[0],
        name: 'Frank',
      });
    });
  });
});
