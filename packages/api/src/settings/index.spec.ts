import { getSettings, updateSettings } from '.';
import { db, defaultItems } from './mock';

describe('Settings', () => {
  test('api - getSettings', async () => {
    expect(await getSettings(defaultItems[0].id)).toEqual(defaultItems[0]);
  });

  test('api - updateSettings', async () => {
    const newSettings = {
      ...defaultItems[0],
      name: 'Frank',
    };

    await updateSettings({ companyId: defaultItems[0].id, settings: newSettings });

    expect(db.findOne(defaultItems[0].id)).toEqual(newSettings);
  });
});
