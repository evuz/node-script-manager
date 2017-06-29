'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('./config/env');

const chalk = require('chalk');
const fs = require('fs-extra');
const webpack = require('webpack');
const appConfig = require('./config/webpack.config.prod');
const mainConfig = require('./config/webpack.config.main');
const paths = require('./config/paths');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const Multispinner = require('multispinner');

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

const tasks = ['main', 'renderer'];

clearConsole();
console.log(chalk.green('Compiling sources.\n'));
const m = new Multispinner(tasks, {
  preText: 'building',
  postText: 'process'
});

// First, read the current file sizes in build directory.
// This lets us display how much they changed later.
measureFileSizesBeforeBuild(paths.mainBuild)
  .then(previousFileSizes => {

    let buildMain;
    let buildRenderer;

    m.on('success', () => {
      clearConsole();
      console.log(`\n\n${buildMain}`)
      finishCompile(buildRenderer);
      process.exit()
    })

    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    fs.emptyDirSync(paths.mainBuild);
    // Merge with the public folder
    copyPublicFolder();

    // Start the main build
    pack(mainConfig).then(result => {
      buildMain = result + '\n\n'
      m.success('main')
    }).catch(err => {
      m.error('main')
      console.log(`\n  ${chalk.bgRed.white(' ERROR ')} failed to build main process`)
      console.error(`\n${err}\n`)
      process.exit(1)
    })

    // Start the renderer build
    build(previousFileSizes)
      .then((res) => {
        buildRenderer = res;
        m.success('renderer')
      },
      err => {
        m.error('renderer')
        console.log(`\n  ${chalk.bgRed.white(' ERROR ')} failed to build renderer process`)
        console.error(`\n${err.message || err}\n`)
        process.exit(1)
      });
  })

function finishCompile({ stats, previousFileSizes, warnings }) {
  if (warnings.length) {
    console.log(chalk.yellow('Compiled with warnings.\n'));
    console.log(warnings.join('\n\n'));
    console.log(
      '\nSearch for the ' +
      chalk.underline(chalk.yellow('keywords')) +
      ' to learn more about each warning.'
    );
    console.log(
      'To ignore, add ' +
      chalk.cyan('// eslint-disable-next-line') +
      ' to the line before.\n'
    );
  } else {
    console.log('File sizes after gzip:\n');
    printFileSizesAfterBuild(stats, previousFileSizes, paths.mainBuild);
    console.log();
    console.log(chalk.green('Compiled successfully.\n'));
  }
}

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
  let compiler = webpack(appConfig);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (process.env.CI && messages.warnings.length) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
            'Most CI servers set it automatically.\n'
          )
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }
      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      });
    });
  });
}

function pack(config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) reject(err.stack || err)
      else if (stats.hasErrors()) {
        let err = ''

        stats.toString({
          chunks: false,
          colors: true
        })
          .split(/\r?\n/)
          .forEach(line => {
            err += `    ${line}\n`
          })

        reject(err)
      } else {
        resolve(stats.toString({
          chunks: false,
          colors: true
        }))
      }
    })
  })
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.mainBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}
