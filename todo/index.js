const electron = require("electron");
const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

const isMac = process.platform === "darwin";

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(`file://${__dirname}/main.html`);

  //closes the whole application
  mainWindow.on("closed", () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

const createAddWindow = () => {
  addWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 300,
    height: 200,
    title: "Add New Todo"
  });
  addWindow.loadURL(`file://${__dirname}/add.html`);
};

const menuTemplate = [
  {
    label: "File",
    submenu: [
      { label: "New Todo", click: () => createAddWindow() },
      {
        label: "Quit",
        accelerator: isMac ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

if (isMac) {
  menuTemplate.unshift({ label: "" });
}
