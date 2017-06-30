import React from 'react';

import { TaskItemComponent } from '../../components';

import './TaskList.css';

const TaskListComponent = (props) => {
  const tasksItem = props.tasks.map((task, index) => (
    <TaskItemComponent
      task={task}
      key={index}
      onChangeTask={props.onChangeTask}
    />
  ));
  return (
    <div className="task_list_component">
      {tasksItem}
    </div>
  )
};

export default TaskListComponent;
