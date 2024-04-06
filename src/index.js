const { app, BrowserWindow, ipcMain, webContents, screen } = require("electron");
const path = require('node:path');
const CryptoDataFetcher = require('./services/api');

const createWindow = () => {
    let cryptoData = null;

    const { width } = screen.getPrimaryDisplay().workAreaSize;

    const win = new BrowserWindow({
        width: 800,
        height: 100,
        frame: false,
        show: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            preload: path.join(__dirname, 'preloads/preload.js'),
            contextIsolation: true,
            contentSecurityPolicy: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';"
        }
    });

    win.once('ready-to-show', () => {
        const cryptoDataFetcher = new CryptoDataFetcher();
        cryptoDataFetcher.getCryptoPriceData()
            .then((response) => {
                cryptoData = response;
                win.webContents.send('receive-data', cryptoData);
                win.show();
            })
            .catch((error) => {
                console.error("There was an error retrieving cryptocurrency data: ", error);
            })
            .finally(() => {
            })
    })

    const x = width - 800;
    const y = 0;

    win.setPosition(x, y);
    win.loadFile('src/renderer/index.html');    
}

app.whenReady().then(() => {
    createWindow();
})