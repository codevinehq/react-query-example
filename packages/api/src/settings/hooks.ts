import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getSettings, updateSettings } from ".";

export const SERVICE_PREFIX = "settings";

export const settingsQueries = createQueryKeys(SERVICE_PREFIX, {
  detail: (id: Parameters<typeof getSettings>["0"]) => ({
    queryKey: [id],
    queryFn: () => getSettings(id),
  }),
});

export const useSettings = (id: Parameters<typeof getSettings>["0"]) => {
  return useQuery(settingsQueries.detail(id));
};

// Need to look into mutation factory patterns
export const useModifySettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSettings,
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({
        queryKey: settingsQueries.detail(companyId).queryKey,
      });
    },
  });
};
