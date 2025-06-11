export const generateGrid = (length: number) => {
  return Array.from({ length }, () => Array.from({ length }, () => 0));
};

export const generateRandomGrid = (length: number) => {
  return Array.from({ length }, () =>
    Array.from({ length }, () => (Math.random() > 0.8 ? 1 : 0))
  );
};
