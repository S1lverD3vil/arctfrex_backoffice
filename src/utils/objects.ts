import _, { PropertyName } from "lodash";

type RemovePrefix<T, P extends string> = {
  [K in keyof T as K extends `${P}${infer Rest}` ? Rest : K]: T[K];
};

export const removePrefix = <T extends object, P extends string>(
  obj: T,
  prefix: P
): RemovePrefix<T, P> => {
  return _.mapKeys(obj, (_value, key) =>
    key.startsWith(prefix) ? key.slice(prefix.length) : key
  ) as RemovePrefix<T, P>;
};

export const cleanObjectKeys = [
  "id",
  "userid",
  "depositid",
  "withdrawalid",
  "is_active",
  "CreatedBy",
  "CreatedAt",
  "ModifiedBy",
  "ModifiedAt",
];

export const cleanObject = <T, K extends PropertyName[]>(
  object: T | null | undefined,
  keys?: K
) => {
  if (!object) return {};

  return _.omit(object, keys || cleanObjectKeys);
};
