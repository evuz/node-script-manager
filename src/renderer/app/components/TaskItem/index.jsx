import React, { Component } from 'react'
import { Card, Icon } from 'semantic-ui-react'

import './index.css';

class TaskItemComponent extends Component {
  constructor() {
    super();

    this.handleRun = this.handleRun.bind(this);
  }

  handleRun() {
    const { task } = this.props;
    const run = !this.props.task.run;
    const newTask = Object.assign({}, task, { run });
    this.props.onChangeTask(newTask);
  }

  render() {
    const { task } = this.props;
    return (
      <Card fluid className="task_item_component">
        <Card.Content>
          <div className="card_container">
            <div className="card_info">
              <div className="name">
                {task.key}
              </div>
              <div className="command">
                {task.command}
              </div>
            </div>
            <Icon
              name={task.run ? 'stop' : 'play'}
              link
              onClick={this.handleRun}
            />
          </div>
        </Card.Content>
      </Card>
    );
  }
}

export default TaskItemComponent;
