import React from 'react';
import Ansi from 'ansi-to-react';
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
    {
      props.task.output ?
        <Card.Content>
          <Card.Description>
            {
              props.task.output.map((line, index) => (
                <p key={index}>
                  <Ansi>
                    {line}
                  </Ansi>
                </p>
              ))
            }
          </Card.Description>
        </Card.Content> : null
    }
  </Card>
);

export default TaskItemComponent;
