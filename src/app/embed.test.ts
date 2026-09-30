// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from 'vitest';
import { preventScrollKeys } from './embed';

let uninstall: (() => void) | null = null;
afterEach(() => { uninstall?.(); uninstall = null; document.body.innerHTML = ''; });

const press = (target: EventTarget, key: string) => {
  const e = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
  target.dispatchEvent(e);
  return e;
};

describe('preventScrollKeys (itch.io iframe)', () => {
  it('cancels scroll keys on the page', () => {
    uninstall = preventScrollKeys();
    for (const k of [' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End']) {
      expect(press(document.body, k).defaultPrevented).toBe(true);
    }
    expect(press(document.body, 'r').defaultPrevented).toBe(false);
  });

  it('still works when a UI handler swallows the key in the capture phase (help overlay regression)', () => {
    uninstall = preventScrollKeys();
    const swallow = (e: Event) => e.stopPropagation();
    document.addEventListener('keydown', swallow, true);
    try {
      expect(press(document.body, 'ArrowDown').defaultPrevented).toBe(true);
      expect(press(document.body, ' ').defaultPrevented).toBe(true);
    } finally {
      document.removeEventListener('keydown', swallow, true);
    }
  });

  it('a focused button owns only Space: arrows and PageDown on it must not scroll the page (help overlay regression)', () => {
    uninstall = preventScrollKeys();
    const button = document.createElement('button');
    document.body.append(button);
    for (const k of ['ArrowDown', 'ArrowUp', 'PageDown', 'End']) expect(press(button, k).defaultPrevented).toBe(true);
    const slider = document.createElement('input');
    slider.type = 'range';
    document.body.append(slider);
    expect(press(slider, ' ').defaultPrevented).toBe(true);
  });

  it('leaves keys alone for controls that use them, and lets game handlers see every key', () => {
    uninstall = preventScrollKeys();
    const button = document.createElement('button');
    const slider = document.createElement('input');
    slider.type = 'range';
    document.body.append(button, slider);
    const seedBox = document.createElement('input');
    document.body.append(seedBox);
    expect(press(button, ' ').defaultPrevented).toBe(false);
    expect(press(slider, 'ArrowRight').defaultPrevented).toBe(false);
    expect(press(seedBox, 'Home').defaultPrevented).toBe(false);
    expect(press(seedBox, ' ').defaultPrevented).toBe(false);
    const seen: string[] = [];
    const onKey = (e: KeyboardEvent) => seen.push(e.key);
    window.addEventListener('keydown', onKey);
    press(document.body, 'ArrowDown');
    window.removeEventListener('keydown', onKey);
    expect(seen).toEqual(['ArrowDown']);
  });
});
