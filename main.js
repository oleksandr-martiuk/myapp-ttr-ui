const { app, BrowserWindow } = require('electron');
require('dotenv').config();

let win;

function createWindow () {
   win = new BrowserWindow({
      // fullscreen: true, // TODO: USER mode
      width: 1000,
      height: 700,
      center: true,
      autoHideMenuBar: true,
      webPreferences: {
         nodeIntegration: true
      },
      icon: 'public/images/logo.ico'
   });

   win.loadFile('index.html');
   win.openDevTools(); // TODO: DEV mode

   win.on('closed', () => {
      win = null;
   })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit();
   }
});

app.on('activate', () => {
   if (win === null) {
      createWindow();
   }
});
