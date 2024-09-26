export const promise = <T>(result: T, ms = 100): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(result), ms));
};
