import { useMemo } from 'react';

import { ITask } from '../types/task';

/** Тип ключа сортировки. */
type SortKey = 'importance' | 'completed';

/**
 * Хук для сортировки задач.
 * @param tasks Список задач.
 * @param sortBy Ключ сортировки.
 * @returns Объект с отсортированным списком задач.
 */
export const useSortedTasks = (tasks: Array<ITask>, sortBy?: SortKey) =>
  useMemo(() => {
    if (sortBy === undefined) {
      return { sortedTasks: tasks };
    }

    const sortConfig: Record<SortKey, (a: ITask, b: ITask) => number> = {
      importance: (a, b) => {
        if (a.important === b.important) return 0;
        return a.important ? -1 : 1;
      },
      completed: (a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
      }
    };

    return { sortedTasks: [...tasks].sort(sortConfig[sortBy]) };
  }, [tasks, sortBy]);