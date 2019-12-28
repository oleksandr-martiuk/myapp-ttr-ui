import React from 'react';
import ReactDOM from 'react-dom';
import Reports from './Reports';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Reports />, div);
  ReactDOM.unmountComponentAtNode(div);
});
