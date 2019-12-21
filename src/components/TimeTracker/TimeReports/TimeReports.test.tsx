import React from 'react';
import ReactDOM from 'react-dom';
import TimeReports from './TimeReports';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TimeReports />, div);
  ReactDOM.unmountComponentAtNode(div);
});