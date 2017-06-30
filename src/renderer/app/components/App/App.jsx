import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  setPackageJson,
  changeScript
 } from './reducer';

import {
  HeaderComponent,
  TaskListComponent
} from '../../components';

import './App.css';

class AppComponent extends Component {
  constructor() {
    super();
    this.onChangeScript = this.onChangeScript.bind(this);
  }

  componentWillMount() {
    ipcRenderer.on('setPackageJson', (event, data) => {
      this.props.setPackageJson(data);
    })
  }

  onChangeScript(newScript) {
    this.props.changeScript(newScript);
  }

  render() {
    const { packageJson } = this.props;
    return (
      <div className="app_component">
        <HeaderComponent
          name={packageJson.name}
          description={packageJson.description}
        />
        <div className="container">
          <TaskListComponent
            tasks={packageJson.scripts || []}
            onChangeTask={this.onChangeScript}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  packageJson: state.app.packageJson
})

const mapDispatchToProps = {
  setPackageJson,
  changeScript
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
