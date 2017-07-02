import React, { Component } from 'react';

import { TaskItemComponent } from '../../components';

import './index.css';

class TaskListComponent extends Component {
  constructor() {
    super();

    this.handleTaskRun = this.handleTaskRun.bind(this);
  }

  handleTaskRun(task) {
    const run = !task.run;
    const newTask = Object.assign({}, task, { run });
    this.props.onTaskRun(newTask);
  }

  render() {
    const tasksItem = this.props.tasks.map((task, index) => (
      <TaskItemComponent
        task={task}
        key={index}
        onTaskRun={this.handleTaskRun}
      />
    ));
    return (
      <div className="task_list_component">
        {tasksItem}
      </div>
    )
  };
}

export default TaskListComponent;
