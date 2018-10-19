/**
 * @module {Function} components/Container
 * @flow
 */
import * as React from 'react';
import toWebComponent from '../WebComponent';

const style = {
  border: '2px solid blue',
  padding: '20px',
};

const Container = ({
  children
}) => (
  <div style={style}>
    <h1>Container</h1>
    {children}
  </div>
);

export default toWebComponent(Container, {name: 'container-component', module});
