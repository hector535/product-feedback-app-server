export const waitFn = (secs) => {
    const end = new Date(Date.now() + secs * 1000);
    while (new Date() <= end)
        ;
};
