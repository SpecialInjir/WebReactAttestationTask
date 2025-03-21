import React, { Suspense } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import { TaskProvider } from '../../context/task-context';
import { TaskEdit } from '../tasks-area/task-edit/task-edit';
import { TaskList } from '../tasks-area/task-area/tasks-area';

import './app.css';

export const App: React.FC = () => (
  <TaskProvider>
    <Router>
      <div className='app'>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Routes>
            <Route path='/' element={<TaskList />} />
            <Route path='/sort/importance' element={<TaskList sortBy='importance' />} />
            <Route path='/sort/completed' element={<TaskList sortBy='completed' />} />
            <Route path='/todo/:id' element={<TaskEdit />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  </TaskProvider>
);