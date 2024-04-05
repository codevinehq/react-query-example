import { generateMock } from "@anatine/zod-mock";
import { z } from "zod";

type Predicate<T> = (fnOrId: ((v: T) => boolean) | string) => (v: T) => boolean;

const createZodMockDB = <T extends z.AnyZodObject>({
  zodSchema,
  primaryKey,
  data = [],
}: {
  zodSchema: T;
  primaryKey: keyof T["_input"];
  data?: T["_output"][];
}) => {
  const createPredicate: Predicate<Item> = (fnOrId) =>
    typeof fnOrId === "string" ? (d) => d[primaryKey] === fnOrId : fnOrId;

  type Item = T["_output"];
  type PredicateParam = Parameters<typeof createPredicate>[0];

  let x: Item[] = data.map((d) => zodSchema.parse(d));
  const partialSchema = zodSchema.partial();

  const methods = {
    findOne(fnOrId: PredicateParam) {
      return x.find(createPredicate(fnOrId));
    },
    find(fnOrId: PredicateParam) {
      return x.filter(createPredicate(fnOrId));
    },
    upsert(fnOrId: PredicateParam, data: Partial<T["_input"]>) {
      const exists = x.some(createPredicate(fnOrId));

      if (exists) {
        methods.update(fnOrId, data);
      } else {
        methods.create(data);
      }
    },
    update(fnOrId: PredicateParam, data: Partial<T["_input"]>) {
      x = x.map((d) => {
        if (createPredicate(fnOrId)(d)) {
          return {
            ...d,
            ...partialSchema.parse(data),
          };
        }

        return d;
      });
    },
    remove(fnOrId: PredicateParam) {
      x = x.filter(createPredicate(fnOrId));
    },
    create: (data: Item) => {
      if (x.some((v) => v[primaryKey] === data[primaryKey])) {
        throw new Error(`Duplicate primaryKey - ${String(primaryKey)}`);
      }

      x = [...x, data];
    },
    reset: () => {
      x = data.map((d) => zodSchema.parse(d));
    },
    generate: () => generateMock(zodSchema),
    debug: () => console.log(x),
  };

  return methods;
};

export default createZodMockDB;
