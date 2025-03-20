import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

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

interface ITaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<ITaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Array<ITask>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const withLoading = async (operation: () => Promise<void>, errorMessage: string) => {
    setLoading(true);
    setError(null);
    try {
      await operation();
    } catch (err) {
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      await withLoading(
        async () => {
          const fetchedTasks = await fetchTasks();
          setTasks(fetchedTasks);
        },
        'Не удалось загрузить задачи.'
      );
    };
    loadTasks();
  }, []);

  const handleAddTask = async (text: string, important: boolean) => {
    if (!text.trim()) {
      setError('Текст задачи не может быть пустым.');
      return;
    }
    await withLoading(
      async () => {
        const newTask = await addTask(text, important);
        setTasks((prevTasks) => [...prevTasks, newTask]);
      },
      'Не удалось добавить задачу.'
    );
  };

  const handleDeleteTask = async (id: number) => {
    await withLoading(
      async () => {
        await deleteTask(id);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
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
        setTasks((prevTasks) => prevTasks.map((t) => (t.id === id ? updatedTask : t)));
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
        setTasks((prevTasks) => prevTasks.map((t) => (t.id === id ? updatedTask : t)));
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
  if (context === undefined) throw new Error('Использовать useTaskContext необходимо в рамках TaskProvider');
  return context;
};