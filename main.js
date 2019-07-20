const path = require('path')
const {app, BrowserWindow} = require('electron')
const url = require('url')



var mainWindow = null;
app.disableDomainBlockingFor3DAPIs();

function createWindow () {
  var windowOptions = {
    width: 1900,
    minWidth: 680,
    height: 1000,
    webPreferences: {nodeIntegration: true}
  }

  mainWindow = new BrowserWindow(windowOptions)
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/newIndex.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  mainWindow.webContents.openDevTools()
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})