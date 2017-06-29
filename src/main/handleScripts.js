const {
  selectFolder
} = require('./handleFolder');
const {
  PackageJsonModel
} = require('./models/packageJson.model');
const {
  dialog,
  app
} = require('electron');
const fs = require('fs');
const path = require('path');

let packageJson;

function readPackageJson(directory) {
  return new Promise((resolve, reject) => {
    const packageJsonPath = path.join(directory, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      fs.readFile(packageJsonPath, 'utf-8', (err, data) => {
        if (err) throw err;
        packageJson = new PackageJsonModel(JSON.parse(data));
        console.log(packageJson);
        resolve();
      })
    } else {
      const options = {
        type: 'info',
        title: 'Information',
        message: 'Can\'t found package.json in the directory.\n Do you want try again?',
        buttons: ['Yes', 'No']
      }
      dialog.showMessageBox(options, (res) => {
        if (res) {
          app.quit();
        } else {
          getWorkingDirectory()
            .then(() => resolve());
        }
      })
    }
  });
}

function getWorkingDirectory() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'development') {
      readPackageJson(path.join(path.resolve(__dirname), '..', '..'))
        .then(() => resolve());
    } else {
      selectFolder()
        .then(directory => {
          if (!directory) return app.quit();
          readPackageJson(directory[0])
            .then(() => resolve());
        });
    }
  })
}

module.exports = {
  getWorkingDirectory
}
