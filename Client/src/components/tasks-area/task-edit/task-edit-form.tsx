import React, { useState } from 'react';
import block from 'bem-cn-lite';

import { ITask } from '../../../types/task';

const b = block('task-edit-form');

interface ITaskEditFormProps {
  task: ITask;
  onSave: (updatedTask: ITask) => void;
}

export const TaskEditForm: React.FC<ITaskEditFormProps> = ({ task, onSave }) => {
  const [localTask, setLocalTask] = useState(task);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setLocalTask((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(localTask);
  };

  return (
    <form className={b()} onSubmit={handleSubmit}>
      <div className={b('field')}>
        <label htmlFor='task-text' className={b('label')}>
          Текст задачи:
        </label>
        <input
          id='task-text'
          name='text'
          type='text'
          className={b('input')}
          value={localTask.text}
          onChange={handleChange}
          placeholder='Введите текст задачи'
        />
      </div>
      <div className={b('field')}>
        <label className={b('label')}>
          <input
            name='important'
            type='checkbox'
            className={b('checkbox')}
            checked={localTask.important}
            onChange={handleChange}
          />
          Задача важная
        </label>
      </div>
      <div className={b('field')}>
        <label className={b('label')}>
          <input
            name='completed'
            type='checkbox'
            className={b('checkbox')}
            checked={localTask.completed}
            onChange={handleChange}
          />
          Выполнена
        </label>
      </div>
      <button type='submit' className={b('button', { save: true })}>
        Сохранить
      </button>
    </form>
  );
};