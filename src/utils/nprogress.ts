import _nprogress from 'nprogress';

export const nprogress = _nprogress;

export const nprogressTry = async (fn: () => any) => {
  nprogress.start();
  return Promise.resolve(fn()).finally(nprogress.done)
};
