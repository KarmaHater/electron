const electron = require("electron"); // running in node runtime
const ffmpeg = require("fluent-ffmpeg"); // running in node runtime
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

// ipcMain.on is what listens to events from the browser window
ipcMain.on("video:submit", (e, path) => {
  console.log(path);
  ffmpeg.ffprobe(path, (err, metadata) => {
    //  mainWindow.webContents.send is send events to the browser
    mainWindow.webContents.send("video:length", metadata.format.duration);
  });
});
