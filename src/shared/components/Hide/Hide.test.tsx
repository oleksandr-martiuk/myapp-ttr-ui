import React from 'react';
import ReactDOM from 'react-dom';
import Hide from './Hide';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Hide />, div);
  ReactDOM.unmountComponentAtNode(div);
});