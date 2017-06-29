const {
  dialog
} = require('electron');

function selectFolder() {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog({
      title: 'Select working directory',
      properties: ['openDirectory']
    }, directory => {
      resolve(directory);
    })
  });
}

module.exports = {
  selectFolder
}
