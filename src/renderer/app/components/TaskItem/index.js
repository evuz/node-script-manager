import React from 'react';
import { Card, Icon } from 'semantic-ui-react'

import './index.css';

const TaskItemComponent = (props) => (
  <Card fluid className="task_item_component">
    <Card.Content>
      <div className="card_container">
        <div className="card_info">
          <div className="name">
            {props.task.key}
          </div>
          <div className="command">
            {props.task.command}
          </div>
        </div>
        <Icon
          name={props.task.run ? 'stop' : 'play'}
          link
          onClick={() => props.onTaskRun(props.task)}
        />
      </div>
    </Card.Content>
  </Card>
);

export default TaskItemComponent;
