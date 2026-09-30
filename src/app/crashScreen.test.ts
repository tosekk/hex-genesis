// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { installCrashScreen, isIgnorable, reloadUrl } from './crashScreen';

let uninstall: (() => void) | null = null;
afterEach(() => { uninstall?.(); uninstall = null; document.body.innerHTML = ''; });

const fireError = (message: string, error: unknown, filename = `${location.origin}/assets/main.js`) =>
  window.dispatchEvent(new ErrorEvent('error', { message, error, filename }));
const fireRejection = (reason: unknown) => {
  const e = new Event('unhandledrejection') as Event & { reason: unknown; promise: Promise<unknown> };
  e.reason = reason;
  window.dispatchEvent(e);
};
const overlay = () => document.querySelector<HTMLElement>('.crash-overlay');

describe('production crash screen', () => {
  it('an uncaught error shows the note with the seed; Reload keeps the other URL params and sets the seed', () => {
    const navigate = vi.fn();
    uninstall = installCrashScreen({ seed: () => 42, navigate });
    expect(overlay()).toBeNull();
    fireError('boom', new TypeError('boom'));
    expect(overlay()!.textContent).toContain('Something went wrong');
    expect(overlay()!.textContent).toContain('seed 42');
    expect(overlay()!.getAttribute('role')).toBe('alertdialog');
    overlay()!.querySelector<HTMLButtonElement>('[data-crash="reload"]')!.click();
    expect(navigate).toHaveBeenCalledOnce();
    expect(new URL(navigate.mock.calls[0][0]).searchParams.get('seed')).toBe('42');
  });

  it('repeats update one note instead of stacking; Keep playing dismisses it; a later error shows it again', () => {
    uninstall = installCrashScreen({ seed: () => 7 });
    for (let i = 0; i < 5; i++) fireError('frame', new Error('frame'));
    expect(document.querySelectorAll('.crash-overlay')).toHaveLength(1);
    expect(overlay()!.textContent).toContain('(5 errors)');
    overlay()!.querySelector<HTMLButtonElement>('[data-crash="keep"]')!.click();
    expect(overlay()).toBeNull();
    fireError('again', new Error('again'));
    expect(overlay()).not.toBeNull();
  });

  it('unhandled rejections show it too; before the first run there is no seed', () => {
    uninstall = installCrashScreen({ seed: () => null });
    fireRejection(new Error('async boom'));
    expect(overlay()!.textContent).toContain('async boom');
    expect(overlay()!.textContent).not.toContain('seed');
  });

  it('ignores noise: cross-origin "Script error.", ResizeObserver, other origins, blocked/aborted media', () => {
    uninstall = installCrashScreen({ seed: () => 1 });
    fireError('Script error.', null);
    fireError('ResizeObserver loop completed with undelivered notifications.', null);
    fireError('x', new Error('x'), 'chrome-extension://abc/content.js');
    fireRejection(new DOMException('play() failed', 'NotAllowedError'));
    fireRejection(new DOMException('interrupted', 'AbortError'));
    fireRejection(new DOMException('no source', 'NotSupportedError'));
    expect(overlay()).toBeNull();
    expect(isIgnorable('boom', new Error('boom'))).toBe(false);
  });

  it('dispose removes the listeners and the note', () => {
    const off = installCrashScreen({ seed: () => 1 });
    fireError('boom', new Error('boom'));
    off();
    expect(overlay()).toBeNull();
    fireError('boom', new Error('boom'));
    expect(overlay()).toBeNull();
  });

  it('reloadUrl keeps other params and only replaces the seed', () => {
    const u = new URL(reloadUrl('https://x.test/g/index.html?ui=legacy&seed=3', 99));
    expect(u.pathname).toBe('/g/index.html');
    expect(u.searchParams.get('ui')).toBe('legacy');
    expect(u.searchParams.get('seed')).toBe('99');
    expect(reloadUrl('https://x.test/?a=1', null)).toBe('https://x.test/?a=1');
  });
});
