import { useSyncExternalStore } from 'react';

/** Tiny shared flag so the hero can wait for the splash screen to finish before animating in. */
let done = false;
const subs = new Set<() => void>();

export function setSplashDone() {
  if (done) return;
  done = true;
  subs.forEach((f) => f());
}

export function useSplashDone() {
  return useSyncExternalStore(
    (cb) => { subs.add(cb); return () => { subs.delete(cb); }; },
    () => done,
    () => true,
  );
}
