import { useMemo } from 'react';

import { ITask } from '../types/task';

type SortKey = 'importance' | 'completed';

/**
 * Хук для сортировки задач.
 * @param tasks Список задач.
 * @param sortBy Ключ сортировки
 * @returns Отсортированный список задач
 */
export const useSortedTasks = (tasks: Array<ITask>, sortBy?: SortKey) => {
  return useMemo(() => {
    if (!sortBy) {
      return { sortedTasks: tasks };
    }

    const compare = (a: ITask, b: ITask) => {
      if (sortBy === 'importance') return Number(b.important) - Number(a.important);
      return Number(a.completed) - Number(b.completed);
    };

    return { sortedTasks: [ ...tasks ].sort(compare) };
  }, [ tasks, sortBy ]);
};