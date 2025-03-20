import React from 'react';
import block from 'bem-cn-lite';

import { TaskAddForm } from '../task-add/task-add-form';
import { SortPanel } from '../../sort-panel/sort-panel';
import { TaskContainer } from '../task-container/task-container';

import './tasks-area.css';

const b = block('tasks-area');

interface ITaskListProps {
  sortBy?: 'importance' | 'completed';
}

export const TaskList: React.FC<ITaskListProps> = ({ sortBy }) => {
  return (
    <div className={b()}>
      <div className={b('top-panel')}>
        <TaskAddForm />
      </div>
      <div className={b('content')}>
        <div className={b('main-panel')}>
         <TaskContainer sortBy={sortBy} />
        </div>
        <div className={b('right-panel')}>
          <SortPanel />
        </div>
      </div>
    </div>
  );
};