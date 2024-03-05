
export const debounce = <T = unknown, R = void>(fn: (args: T) => R, delay: number): [(args: T) => void, () => void] => {
  let timeout: NodeJS.Timeout;

  const debouncedFunc = (args: T) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fn(args);
    }, delay);
  };

  const teardown = () => clearTimeout(delay);

  return [debouncedFunc, teardown];
};
