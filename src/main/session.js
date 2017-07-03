const os = require('os');
const pty = require('node-pty');

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

const taskRunning = {};

function runSession({ key, command, run }) {
  if (run) {
    taskRunning[key] = Session(key, command);
  } else {
    taskRunning[key].close();
  }
}

function Session(key, command) {
  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
  });

  ptyProcess.on('data', function (data) {
    console.log('data: ', data);
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
