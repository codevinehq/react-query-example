import { getSettings, updateSettings } from '.';
import { db, defaultItems } from './mock';

describe('Settings', () => {
  describe('api', () => {
    test('getSettings', async () => {
      expect(await getSettings(defaultItems[0].id)).toEqual(defaultItems[0]);
    });

    test('updateSettings', async () => {
      const newSettings = {
        id: '2',
        name: 'Bob',
      };

      await updateSettings({
        companyId: '2',
        settings: newSettings,
      });

      expect(db.findOne('2')).toEqual(newSettings);
    });
  });
});
