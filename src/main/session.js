const os = require('os');
const pty = require('node-pty');

const AU = require('ansi_up');

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

const taskRunning = {};

function runSession(mainWindow, { key, command, run }) {
  if (run) {
    taskRunning[key] = Session(mainWindow, key, command);
  } else {
    taskRunning[key].close();
  }
}

function Session(mainWindow, key, command) {
  const ansiUp = new AU.default;
  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
  });

  ptyProcess.on('data', function (data) {
    console.log('data: ', data);
    mainWindow.webContents.send('data', {
      key,
      data: ansiUp.ansi_to_text(data)
    });
  });

  ptyProcess.write(`${command}\r`);

  return {
    pid: ptyProcess.pid,
    close() {
      console.log('close');
      ptyProcess.destroy();
    }
  }
}

module.exports = {
  runSession
};
