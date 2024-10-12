export function debounce(func: Function, delay: number): Function {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: any[]) {
    const context = this;
    clearTimeout(timeoutId ?? undefined);

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
