import React from 'react';
import block from 'bem-cn-lite';

import { useTaskContext } from '../../../context/task-context';
import { TaskCard } from '../task-card/task-card';
import { useSortedTasks } from '../../../hooks/use-sorted-tasks';

import './task-container.css';

const b = block('task-container');
interface ITaskContainerProps {
  sortBy?: 'importance' | 'completed';
}

export const TaskContainer: React.FC<ITaskContainerProps> = ({ sortBy }) => {
  const { tasks, loading } = useTaskContext();
  const { sortedTasks } = useSortedTasks(tasks, sortBy);

  if (loading) return <p>Загрузка...</p>;
  if (!sortedTasks.length) return <p>Нет задач</p>;

  return (
    <div className={b('container')}>
      <div className={b('container-header')} />
      <div className={b('container-body')}>
        {sortedTasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};