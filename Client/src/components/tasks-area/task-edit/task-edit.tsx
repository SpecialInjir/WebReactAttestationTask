import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import block from 'bem-cn-lite';
import { ITask } from 'src/types/task';

import { useTaskContext } from '../../../context/task-context';

import { TaskEditForm } from './task-edit-form';
import './task-edit.css';

const b = block('task-edit');

export const TaskEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Тип строго указан
  const { tasks, loading, handleUpdateTask } = useTaskContext();

  const taskId = id !== undefined ? parseInt(id, 10) : NaN;

  if (isNaN(taskId)) {
    return <div className={b('error')}>Неверный ID задачи</div>;
  }

  const task = tasks.find((t) => t.id === taskId);

  const handleSave = async (updatedTask: ITask) => {
      await handleUpdateTask(updatedTask.id, updatedTask);
      navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) return <div className={b('loading')}>Загрузка...</div>;
  if (task === undefined) return <div className={b('error')}>Задача не найдена</div>;

  return (
    <div className={b()}>
      <h2 className={b('title')}>Редактировать задачу</h2>
      <button className={b('button', { back: true })} onClick={handleBack}>
        Вернуться в список
      </button>
      <TaskEditForm task={task} onSave={handleSave} />
    </div>
  );
};