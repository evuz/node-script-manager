const {
  app,
  BrowserWindow,
  globalShortcut
} = require('electron');
const {
  getWorkingDirectory
} = require('./handleScripts');

let mainWindow;

const winURL = process.env.NODE_ENV === 'development' ?
  'http://localhost:3000' :
  `file://${__dirname}/index.html`;

function createWindow() {
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
}

app.on('ready', () => {
  getWorkingDirectory()
    .then(createWindow)
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
