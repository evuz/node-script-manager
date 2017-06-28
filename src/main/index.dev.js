/**
 * This file is used specifically and only for development. It installs
 * `electron-debug`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */

// Set environment for development
process.env.NODE_ENV = 'development'

// Install `electron-debug` with `devtron`
require('electron-debug')({
  showDevTools: true
})

// Install `react-devtools` and `redux-devtools`
require('electron').app.on('ready', () => {
  const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer')
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(() => {})
    .catch((err) => console.log('An error occurred: ', err));
  installExtension(REDUX_DEVTOOLS)
    .then(() => {})
    .catch((err) => console.log('An error occurred: ', err));
})

// Require `main` process to boot app
require('./index')
