import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import block from 'bem-cn-lite';

import { ITask } from '../../../types/task';
import { useTaskContext } from '../../../context/task-context';

import './task-card.css';

const b = block('task-card');

interface ITaskCardProps {
  task: ITask;
  index: number;
}

export const TaskCard = memo<ITaskCardProps>(({ task, index }) => {
  const { handleToggleCompleted, handleDeleteTask } = useTaskContext();
  const navigate = useNavigate();

  const onToggleCompleted = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleToggleCompleted(task.id);
  };

  const onDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await handleDeleteTask(task.id);
    }
    catch (error) {
      alert('Не удалось удалить задачу.');
    }
  };

  const onEdit = () => {
    navigate(`/todo/${task.id}`);
  };

  return (
    <div
      className={b({
        even: index % 2 === 0,
        important: task.important,
        completed: task.completed
      })}
      onClick={onEdit}
    >
      <span className={b('cell')}>
        {task.important && <span className={b('icon')}>⚡</span>}
        {task.text}
      </span>
      <span className={b('cell')}>
        <button className={b('button')} onClick={onToggleCompleted}>
          {task.completed ? 'Вернуть в работу' : 'Выполнить'}
        </button>
      </span>
      <span className={b('cell')}>
        <button className={b('button')} onClick={onDelete}>
          Удалить
        </button>
      </span>
    </div>
  );
});