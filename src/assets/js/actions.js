export default function quit() {
  window.remote.globalShortcut.unregisterAll();
  window.remote.app.quit();
}