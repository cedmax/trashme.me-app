export function quit() {
  window.electron.remote.globalShortcut.unregisterAll();
  window.electron.remote.app.quit();
}

export function saveSettings(key, value) {
  window.settings[key] = value;
  window.electron.ipcRenderer.send('save-settings', {
    [key]: value
  });
}

export function getSetting(key) {
  return window.settings[key];
}