import { ipcRenderer } from 'electron';
import { connect } from 'react-redux';
import { TaskListComponent } from '../components';
import { changeScript } from '../reducers/app';

function onTaskRun (newTask) {
  return (dispatch) => {
    ipcRenderer.send('run-script', newTask);
    dispatch(changeScript(newTask));
  }
}

const mapStateToProps = (state) => ({
    tasks: state.app.packageJson.scripts || []
})

const mapDispatchToProps = {
    onTaskRun
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListComponent);
