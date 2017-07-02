import { connect } from 'react-redux';
import { HeaderComponent } from '../components';

const mapStateToProps = (state) => {
    const { name, description } = state.app.packageJson;
    return {
        name,
        description
    }
}

export default connect(mapStateToProps)(HeaderComponent);