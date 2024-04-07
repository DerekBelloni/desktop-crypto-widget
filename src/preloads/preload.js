const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  onReceiveData: (callback) => {
    ipcRenderer.on('receive-data', (_event, data, isUpdate) => callback(data, isUpdate));
  }
});