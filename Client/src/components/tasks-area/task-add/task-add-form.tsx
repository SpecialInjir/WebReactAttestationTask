import React, { useState } from 'react';
import block from 'bem-cn-lite';

import { useTaskContext } from '../../../context/task-context';

import './task-add-form.css';

const b = block('task-add-form');

export const TaskAddForm: React.FC = () => {
  const { handleAddTask } = useTaskContext();
  const [formData, setFormData] = useState({ text: '', important: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.text.trim()) return;
    await handleAddTask(formData.text, formData.important);
    setFormData({ text: '', important: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form className={b()} onSubmit={handleSubmit}>
      <input
        className={b('input')}
        name='text'
        type='text'
        placeholder='Текст новой задачи'
        value={formData.text}
        onChange={handleChange}
      />
      <label className={b('label')}>
        <input
          className={b('checkbox')}
          name='important'
          type='checkbox'
          checked={formData.important}
          onChange={handleChange}
        />
        Задача важная
      </label>
      <button className={b('button')} type='submit'>
        Добавить
      </button>
    </form>
  );
};