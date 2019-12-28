import React from 'react';
import ReactDOM from 'react-dom';
import TimeTracker from './TimeReports';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TimeTracker />, div);
  ReactDOM.unmountComponentAtNode(div);
});
