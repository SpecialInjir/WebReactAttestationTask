import axios from 'axios';

import { ITask } from '../types/task';

const API_URL = 'api/tasks';

export const fetchTasks = async (): Promise<Array<ITask>> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTask = async (text: string, important: boolean): Promise<ITask> => {
  const response = await axios.post(API_URL, { text, important, completed: false });
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateTask = async (id: number, task: ITask): Promise<ITask> => {
  const response = await axios.put(`${API_URL}/${id}`, task);
  return response.data;
};