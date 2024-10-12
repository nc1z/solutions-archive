export function promiseAny(iterable: any[]): Promise<any> {
  return new Promise((resolve, reject) => {
    const errors = new Array(iterable.length);
    let unresolved = iterable.length;

    if (unresolved === 0) {
      return reject(new AggregateError(errors, "All promises rejected"));
    }

    iterable.forEach(async (item, index) => {
      try {
        const value = await item;
        resolve(value);
      } catch (error) {
        errors[index] = error;
        unresolved--;

        if (unresolved === 0) {
          return reject(new AggregateError(errors, "All promises rejected"));
        }
      }
    });
  });
}
