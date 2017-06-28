'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('./config/env');

const fs = require('fs');
const chalk = require('chalk');
const electron = require('electron');
const { spawn } = require('child_process');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const paths = require('./config/paths');
const appConfig = require('./config/webpack.config.dev');
const mainConfig = require('./config/webpack.config.main');
const createDevServerConfig = require('./config/webpackDevServer.config');

const useYarn = fs.existsSync(paths.yarnLockFile);

// Electron variables
let electronProcess = null
let manualRestart = false

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// We attempt to use the default port but if it is busy, we offer the user to
// run on a different port. `detect()` Promise resolves to the next free port.
function startRenderer() {
  return new Promise((resolve, reject) => {
    choosePort(HOST, DEFAULT_PORT)
      .then(port => {
        if (port == null) {
          // We have not found a port.
          return;
        }
        const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
        const appName = require(paths.appPackageJson).name;
        const urls = prepareUrls(protocol, HOST, port);
        // Create a webpack compiler that is configured with custom messages.
        const compiler = createCompiler(webpack, appConfig, appName, urls, useYarn);
        // Load proxy config
        const proxySetting = require(paths.appPackageJson).proxy;
        const proxyConfig = prepareProxy(proxySetting, paths.appPublic);
        // Serve webpack assets generated by the compiler over a web sever.
        const serverConfig = Object.assign({}, createDevServerConfig(
          proxyConfig,
          urls.lanUrlForConfig
        ),
          {
            setup(app, ctx) {
              // app.use(hotMiddleware)
              ctx.middleware.waitUntilValid(() => {
                resolve()
              })
            }
          }
        );
        const devServer = new WebpackDevServer(compiler, serverConfig);
        // Launch WebpackDevServer.
        devServer.listen(port, HOST, err => {
          if (err) {
            return console.log(err);
          }
        });

        ['SIGINT', 'SIGTERM'].forEach(function (sig) {
          process.on(sig, function () {
            devServer.close();
            process.exit();
          });
        });
      })
      .catch(err => {
        if (err && err.message) {
          console.log(err.message);
        }
        process.exit(1);
      });
  })
}

function startMain() {
  return new Promise((resolve, reject) => {
    mainConfig.entry.main = [paths.mainDevIndexJs].concat(mainConfig.entry.main)

    const compiler = webpack(mainConfig)

    compiler.plugin('watch-run', (compilation, done) => {
      done()
    })

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err)
        return
      }

      logStats('Main', stats)

      if (electronProcess && electronProcess.kill) {
        manualRestart = true
        process.kill(electronProcess.pid)
        electronProcess = null
        startElectron()

        setTimeout(() => {
          manualRestart = false
        }, 5000)
      }

      resolve()
    })
  })
}

function logStats(proc, data) {
  let log = ''

  log += chalk.yellow.bold(`┏ ${proc} Process ${new Array((19 - proc.length) + 1).join('-')}`)
  log += '\n\n'

  if (typeof data === 'object') {
    data.toString({
      colors: true,
      chunks: false
    }).split(/\r?\n/).forEach(line => {
      log += '  ' + line + '\n'
    })
  } else {
    log += `  ${data}\n`
  }

  log += '\n' + chalk.yellow.bold(`┗ ${new Array(28 + 1).join('-')}`) + '\n'

  console.log(log)
}

function startElectron() {
  electronProcess = spawn(electron, ['--inspect=5858', paths.mainIndexJsBuild])

  electronProcess.stdout.on('data', data => {
    electronLog(data, 'blue')
  })
  electronProcess.stderr.on('data', data => {
    electronLog(data, 'red')
  })

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}

function electronLog(data, color) {
  let log = ''
  data = data.toString().split(/\r?\n/)
  data.forEach(line => {
    log += `  ${line}\n`
  })
  if (/[0-9A-z]+/.test(log)) {
    console.log(
      chalk[color].bold('┏ Electron -------------------') +
      '\n\n' +
      log +
      chalk[color].bold('┗ ----------------------------') +
      '\n'
    )
  }
}

function greeting() {
  clearConsole();
  console.log(chalk.cyan('Webpack is transpiling files...\n'));
}

function init() {
  greeting()

  Promise.all([startRenderer(), startMain()])
    .then(() => {
      startElectron()
    })
    .catch(err => {
      console.error(err)
    })
}

init()
