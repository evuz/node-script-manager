import React from 'react';
import { Card } from 'semantic-ui-react'

import './TaskList.css';

const TaskListComponent = (props) => {
  const tasksItem = props.tasks.map((task, index) => (
    <Card key={index} fluid>
      <Card.Content header={task.key} meta={task.command} />
    </Card>
  ));
  return (
    <div className="task_list_component">
      {tasksItem}
    </div>
  )
};

export default TaskListComponent;
