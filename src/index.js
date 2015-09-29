import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import start from './utils/StartApp';
import {
  init,
  update,
  view
} from './CounterList';

// have to mount this ourselves since main isn't auto mounted by a runtime
start({
  model: init,
  view,
  update
}).subscribe(function (view) {
  ReactDOM.render(view, document.getElementById('app'));
});
