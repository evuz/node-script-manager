import React from 'react';
import { Card, Icon } from 'semantic-ui-react'

import './index.css';

const TaskItemComponent = (props) => (
  <Card fluid className="task_item_component">
    <Card.Content>
      <div className="card_container">
        <div className="card_info">
          <div className="name">
            <h3>{props.task.key}</h3>
          </div>
          <div className="command">
            {props.task.command}
          </div>
        </div>
        <Icon
          name={props.task.run ? 'stop' : 'play'}
          color={props.task.run ? 'red' : 'green'}
          onClick={() => props.onTaskRun(props.task)}
          link
        />
      </div>
    </Card.Content>
  </Card>
);

export default TaskItemComponent;
