const { app, BrowserWindow } = require("electron");
const path = require('node:path');
const CryptoDataFetcher = require('./services/api');

// Create function for fetching crypto prices

const createWindow = () => {
    const cryptoDataFetcher = new CryptoDataFetcher();
    cryptoDataFetcher.getCryptoPriceData()
        .then((response) => {
            console.log('In main process, crypto data: ', response);
        })

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preloads/preload.js')
        }
    });

    win.loadFile('src/renderer/index.html');
}

app.whenReady().then(() => {
    createWindow();
})