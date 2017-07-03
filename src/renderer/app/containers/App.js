import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderContainer from './Header';
import TaskListContainer from './TaskList';

import { setPackageJson, addOutput } from '../reducers/app';

class AppComponent extends Component {
  componentWillMount() {
    ipcRenderer.on('setPackageJson', (event, data) => {
      this.props.setPackageJson(data);
    })

    ipcRenderer.on('data', (event, {key, data}) => {
      this.props.addOutput(key, data);
      console.log(data);
    })
  }

  render() {
    return (
      <div className="app_component">
        <HeaderContainer />
        <div className="container">
          <TaskListContainer />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setPackageJson,
  addOutput
}

export default connect(null, mapDispatchToProps)(AppComponent);
