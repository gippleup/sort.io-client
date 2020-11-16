export const stringifyValues = (obj: Object) => {
  const entries = Object.entries(obj).map(([key, value]) => {
    return [key, JSON.stringify(value)];
  });
  const newObj = Object.fromEntries(entries)
  return newObj;
}