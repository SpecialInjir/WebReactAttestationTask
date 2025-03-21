import React from 'react';
import { useNavigate } from 'react-router';
import block from 'bem-cn-lite';

import './sort-panel.css';

const b = block('sort-panel');

export const SortPanel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={b()}>
      <h3>Сортировать</h3>
      <button className={b('button')} onClick={() => navigate('/sort/importance')}>
        По важности
      </button>
      <button className={b('button')} onClick={() => navigate('/sort/completed')}>
        По выполнению
      </button>
    </div>
  );
};