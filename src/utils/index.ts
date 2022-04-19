export const debounce = (fn: Function, wait: number) => {
  let timer: ReturnType<typeof setTimeout>;
  function debounced(e: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(e), wait);
  }
  return debounced;
};
