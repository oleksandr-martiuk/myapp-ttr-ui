const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

require('dotenv').config({
   path: `${__dirname}/.env`
});

const path = require('path');
const url = require('url');

let mainWindow;

const createWindow = () => {
   mainWindow = new BrowserWindow({
      fullscreen: true, // TODO: USER-mode
      width: 1000,
      height: 700,
      center: true,
      autoHideMenuBar: true,
      webPreferences: {
         nodeIntegration: true,
         preload: __dirname + '/preload.js'
      },
      icon: 'public/images/logo.ico'
   });

   const startUrl = process.env.ELECTRON_START_URL || url.format({
      pathname: path.join(__dirname, '/build/index.html'),
      protocol: 'file:',
      slashes: true
   });
   mainWindow.loadURL(startUrl);

   // mainWindow.webContents.openDevTools(); // TODO: DEV-mode

   mainWindow.on('closed', function () {
      mainWindow = null
   })
};

app.on('ready', createWindow);

app.on('window-all-closed', function () {
   if (process.platform !== 'darwin') {
      app.quit()
   }
});

app.on('activate', function () {
   if (mainWindow === null) {
      createWindow()
   }
});
