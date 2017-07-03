const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron');
const { getWorkingDirectory } = require('./handleScripts');
const { runSession } = require('./session');

let mainWindow;

const winURL = process.env.NODE_ENV === 'development' ?
  'http://localhost:3000' :
  `file://${__dirname}/index.html`;

function createWindow(packageJson) {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  mainWindow.loadURL(winURL);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('setPackageJson', packageJson);
  })
}

app.on('ready', () => {
  getWorkingDirectory()
    .then((packageJson) => createWindow(packageJson))
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('run-script', (event, task) => {
  runSession(task);
})
