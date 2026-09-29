/** Dev-only: show uncaught errors on screen so they can't hide in the console. */
export function installErrorOverlay(): void {
  const box = document.createElement('pre');
  box.style.cssText =
    'position:fixed;left:8px;right:8px;bottom:8px;max-height:40vh;overflow:auto;margin:0;padding:8px;' +
    'background:rgba(120,0,0,.9);color:#fff;font:12px/1.4 monospace;z-index:99999;white-space:pre-wrap;display:none';
  box.title = 'click to dismiss';
  box.addEventListener('click', () => { box.style.display = 'none'; box.textContent = ''; });
  document.body.appendChild(box);
  const show = (msg: string) => {
    box.textContent += msg + '\n';
    box.style.display = 'block';
  };
  window.addEventListener('error', (e) => show(String(e.error?.stack ?? e.message)));
  window.addEventListener('unhandledrejection', (e) => show('Unhandled rejection: ' + String(e.reason?.stack ?? e.reason)));
}
