import { http, HttpResponse } from "msw";

import { SettingsSchema, UpdateSettingsSchema } from ".";
import createZodMockDB from "../mock-db";

export const defaultItems = [{ id: "1", name: "name-1" }];

export const db = createZodMockDB({
  zodSchema: SettingsSchema,
  primaryKey: "id",
  data: defaultItems,
});

export const ids = {
  NOT_FOUND: "NOT_FOUND",
  ERROR: "ERROR",
};

export const handlers = [
  http.get("/api/v1/settings/:id", ({ params }) => {
    const id = params.id as string;

    if (id === ids.NOT_FOUND) {
      return HttpResponse.json(null, { status: 404 });
    }

    if (id === ids.ERROR) {
      return HttpResponse.json(null, { status: 500 });
    }

    const item = db.findOne(id);
    return HttpResponse.json(item, { status: item ? 200 : 404 });
  }),
  http.put("/api/v1/settings/:id", async ({ params, request }) => {
    const id = params.id as string;
    const body = UpdateSettingsSchema.parse(await request.json());

    db.upsert(id, body);

    return HttpResponse.json(db.findOne(id), { status: 200 });
  }),
];
