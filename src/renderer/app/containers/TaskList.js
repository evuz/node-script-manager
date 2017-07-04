import { connect } from 'react-redux';
import { TaskListComponent } from '../components';
import { runScript } from '../reducers/app';

const mapStateToProps = (state) => ({
    tasks: state.app.packageJson.scripts || []
})

const mapDispatchToProps = {
    onTaskRun: runScript
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListComponent);
