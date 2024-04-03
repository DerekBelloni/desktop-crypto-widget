const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  onReceiveData: (callback) => {
    console.log('onReceiveData called in preload script');
    ipcRenderer.on('receive-data', (_event, data) => callback(data));
  }
});