import { z } from 'zod';

export const SettingsSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
});
export const UpdateSettingsSchema = SettingsSchema.partial();

export type Settings = z.infer<typeof SettingsSchema>;
export type UpdateSettings = z.infer<typeof UpdateSettingsSchema>;

export const getSettings = async (companyId: string) => {
  const data = await fetch(`/api/v1/settings/${companyId}`).then((r) => r.json());
  return SettingsSchema.parse(data);
};

export const updateSettings = async ({ companyId, settings }: { companyId: string; settings: UpdateSettings }) => {
  const body = await UpdateSettingsSchema.parse(settings);
  await fetch(`/api/v1/settings/${companyId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
