import yerbamate from 'yerbamate';

export function runTask(command, stdout) {
  return yerbamate.run(command, process.env.HOME, {
    stderr: stdout,
    stdout: stdout
  }, (code) => {
    console.log(code);
  })
}

export function stopTask(proc, callback) {
  yerbamate.stop(proc, callback);
}
