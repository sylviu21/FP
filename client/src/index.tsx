import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Application from './app/App';
import { AppStore } from './app/store';

ReactDOM.render(
  <AppStore>
    <Application />
  </AppStore>,
  document.getElementById('root')
);
