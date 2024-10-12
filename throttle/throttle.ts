export function throttle(func: Function, limit: number): Function {
  let lastCall = 0;

  return function (this: any, ...args: any[]) {
    const context = this;
    const now = Date.now();

    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(context, args);
    }
  };
}
