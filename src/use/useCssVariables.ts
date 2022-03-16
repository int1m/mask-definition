export const setCSSVariable = (name: string, val: string): void => {
  document.documentElement.style.setProperty(name, val);
};

export const getCSSVariable = (name: string): string => getComputedStyle(document.documentElement)
  .getPropertyValue(name);
