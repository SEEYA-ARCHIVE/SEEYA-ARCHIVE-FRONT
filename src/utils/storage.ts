export const setLocalStorage = (key: string, val: any) => {
  localStorage.setItem(key, JSON.stringify(val));
};

export const getLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || '{}');
};
