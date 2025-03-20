import * as React from 'react';
import { render } from 'react-dom';

import { App } from './components/app/app';

require('./components/app/app.css');

render(
  <App />,
  document.getElementById('app')
);