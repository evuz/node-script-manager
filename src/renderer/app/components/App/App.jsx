import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setPackageJson } from './reducer';

import {
  HeaderComponent
} from '../../components';

import './App.css';

class AppComponent extends Component {
  componentWillMount() {
    ipcRenderer.on('setPackageJson', (event, data) => {
      this.props.setPackageJson(data);
    })
  }

  render() {
    const { packageJson } = this.props;
    return (
      <div className="app_component">
        <HeaderComponent
          name={packageJson.name}
          description={packageJson.description}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  packageJson: state.app.packageJson
})

const mapDispatchToProps = {
  setPackageJson
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
