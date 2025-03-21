import React, { createContext, useContext, useEffect, useState } from 'react';

import { ITask } from '../types/task';
import { addTask, deleteTask, fetchTasks, updateTask } from '../api/api';

interface ITaskContext {
  tasks: Array<ITask>;
  loading: boolean;
  error: string | null;
  handleAddTask: (text: string, important: boolean) => Promise<void>;
  handleDeleteTask: (id: number) => Promise<void>;
  handleToggleCompleted: (id: number) => Promise<void>;
  handleUpdateTask: (id: number, task: ITask) => Promise<void>;
}

const TaskContext = createContext<ITaskContext | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ tasks, setTasks ] = useState<Array<ITask>>([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);

  const withLoading = async (operation: () => Promise<void>, errorMessage: string) => {
    try {
      setLoading(true);
      setError(null);
      await operation();
    }
    catch (err) {
      setError(errorMessage);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    withLoading(
      async () => setTasks(await fetchTasks()),
      'Не удалось загрузить задачи.'
    );
  }, []);

  const handleAddTask = async (text: string, important: boolean) => {
    if (!text.trim()) {
      setError('Текст задачи не может быть пустым.');
      return;
    }

    await withLoading(async () => {
      const newTask = await addTask(text, important);
      setTasks((prev) => [ ...prev, newTask ]);
    }, 'Не удалось добавить задачу.');
  };

  const handleDeleteTask = async (id: number) => {
    await withLoading(
      async () => {
        await deleteTask(id);
        setTasks((prev) => prev.filter((task) => task.id !== id));
      },
      'Не удалось удалить задачу.'
    );
  };

  const handleToggleCompleted = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) {
      setError('Задача не найдена.');
      return;
    }
    await withLoading(
      async () => {
        const updatedTask = await updateTask(id, { ...task, completed: !task.completed });
        setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
      },
      'Не удалось обновить статус задачи.'
    );
  };

  const handleUpdateTask = async (id: number, task: ITask) => {
    if (!task.text.trim()) {
      setError('Текст задачи не может быть пустым.');
      return;
    }
    await withLoading(
      async () => {
        const updatedTask = await updateTask(id, task);
        setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
      },
      'Не удалось обновить задачу.'
    );
  };

  const value: ITaskContext = {
    tasks,
    loading,
    error,
    handleAddTask,
    handleDeleteTask,
    handleToggleCompleted,
    handleUpdateTask
  };

  return React.createElement(TaskContext.Provider, { value }, children);
};

export const useTaskContext = (): ITaskContext => {
  const context = useContext(TaskContext);
  if (context === undefined) throw new Error('useTaskContext должен использоваться в рамках  TaskProvider');
  return context;
};