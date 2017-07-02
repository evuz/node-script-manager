import { connect } from 'react-redux';
import { TaskListComponent } from '../components';
import { changeScript } from '../reducers/app';

const mapStateToProps = (state) => ({
    tasks: state.app.packageJson.scripts || []
})

const mapDispatchToProps = {
    onTaskRun: changeScript
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListComponent);