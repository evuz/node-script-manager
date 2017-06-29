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
      console.log(data);
    })
  }

  render() {
    return (
      <div className="app_component">
        <HeaderComponent></HeaderComponent>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  packageJson: state.packageJson
})

const mapDispatchToProps = {
  setPackageJson
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
