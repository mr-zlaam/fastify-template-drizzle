// util/throwError.ts
export const throwError = (status: number, message: string) => {
  const err = new Error(message) as unknown as { statusCode: number };
  err.statusCode = status;
  throw err;
};
