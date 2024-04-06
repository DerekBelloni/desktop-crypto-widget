const { app, BrowserWindow, ipcMain } = require("electron");
const path = require('node:path');
const CryptoDataFetcher = require('./services/api');

const createWindow = () => {
    let cryptoData = null;
    const win = new BrowserWindow({
        width: 800,
        height: 100,
        frame: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            preload: path.join(__dirname, 'preloads/preload.js'),
            contextIsolation: true,
            contentSecurityPolicy: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';"
        }
    });

    const cryptoDataFetcher = new CryptoDataFetcher();
    
    cryptoDataFetcher.getCryptoPriceData()
        .then((response) => {
            cryptoData = response;
            win.webContents.send('receive-data', cryptoData);
        })
        .catch((error) => {
            console.error("There was an error retrieving cryptocurrency data: ", error);
        })
        .finally(() => {
        })


    win.loadFile('src/renderer/index.html');
}

app.whenReady().then(() => {
    createWindow();
})