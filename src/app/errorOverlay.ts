/** Dev-only: show uncaught errors on screen so they can't hide in the console. Repeats are counted, not re-listed. */
export function installErrorOverlay(): void {
  const box = document.createElement('pre');
  box.style.cssText =
    'position:fixed;left:8px;right:8px;bottom:8px;max-height:40vh;overflow:auto;margin:0;padding:8px;' +
    'background:rgba(120,0,0,.9);color:#fff;font:12px/1.4 monospace;z-index:99999;white-space:pre-wrap;display:none';
  box.title = 'click to dismiss';
  const seen = new Map<string, number>();
  const render = () => {
    box.textContent = [...seen].map(([msg, n]) => (n > 1 ? `(×${n}) ` : '') + msg).join('\n');
    box.style.display = seen.size ? 'block' : 'none';
  };
  box.addEventListener('click', () => { seen.clear(); render(); });
  document.body.appendChild(box);
  const show = (msg: string) => {
    seen.set(msg, (seen.get(msg) ?? 0) + 1);
    render();
  };
  window.addEventListener('error', (e) => show(String(e.error?.stack ?? e.message)));
  window.addEventListener('unhandledrejection', (e) => show('Unhandled rejection: ' + String(e.reason?.stack ?? e.reason)));
}
