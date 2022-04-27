export const debounce = (fn: Function, wait: number) => {
  let timer: ReturnType<typeof setTimeout>;
  function debounced(e?: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(e), wait);
  }
  return debounced;
};

/**
 * 1. 도형들 이벤트에서 mouseEnter, mouseLeave 이벤트가 너무 많이 발생해
 * 디바운스 시도
 * => 디바운스로는 마지막 이벤트가 발생된다. leave가 마지막으로 발생할 것이라 예상했지만
 * 버벅이면서 깜빡이는 현상 발생
 *
 * 2. useRef로 도형 위에있는 상태를 Tracking하려고 시도.
 * ```
 * const isLeave = useRef( true );
 * onMouseEnter: isLeave.current = false;
 * onMouseLeave: isLeave.current = true;
 *
 * - debounce
 * if (timer || isLeave) clearTimeout(timer);
 * ```
 *
 * 직전 isLeave상태이기도 하고 깜빡임 현상도 똑같이 발생
 *
 */
