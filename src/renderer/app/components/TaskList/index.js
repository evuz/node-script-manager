import React from 'react';

import { TaskItemComponent } from '../../components';

import './index.css';

const TaskListComponent = (props) => {
  const tasksItem = props.tasks.map((task, index) => (
    <TaskItemComponent
      task={task}
      key={index}
      onTaskRun={(task) => props.onTaskRun(task)}
    />
  ));
  return (
    <div className="task_list_component">
      {tasksItem}
    </div>
  )
};

export default TaskListComponent;
