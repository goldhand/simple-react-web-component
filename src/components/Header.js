/**
 * @module {Function} components/Header
 * @flow
 */
import * as React from 'react';
import toWebComponent from '../WebComponent';

const style = {
  color: 'rebeccapurple',
};

const Header = ({
  text
}) => (
  <h1 style={style}>{text}</h1>
);

export default toWebComponent(Header, {name: 'header-component', module});
