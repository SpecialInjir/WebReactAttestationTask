import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import block from 'bem-cn-lite';
import { ITask } from 'src/types/task';

import { useTaskContext } from '../../../context/task-context';

import './task-edit.css';
import { TaskEditForm } from './task-edit-form';

const b = block('task-edit');

export const TaskEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, loading, handleUpdateTask } = useTaskContext();

  const taskId = parseInt(id || '', 10);
  const task = tasks.find((t) => t.id === taskId) || null;

  const handleSave = async (updatedTask: ITask) => {
    await handleUpdateTask(updatedTask.id, updatedTask);
    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) return <div className={b('loading')}>Загрузка...</div>;
  if (isNaN(taskId)) return <div className={b('error')}>Неверный ID задачи</div>;
  if (!task) return <div className={b('error')}>Задача не найдена</div>;

  return (
    <div className={b()}>
      <h2 className={b('title')}>Редактировать задачу</h2>
      <button className={b('button', { back: true })} onClick={handleBack}>
        Вернуться в список
      </button>
      <TaskEditForm task={task!} onSave={handleSave} />
    </div>
  );
};