export const notUndefined = <T>(value: T | undefined): value is T => {
  return value !== undefined;
};
