export const waitFn = (secs: number) => {
  const end = new Date(Date.now() + secs * 1000);

  while (new Date() <= end);
};
