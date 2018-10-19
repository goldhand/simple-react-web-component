/**
 * @module {Function} components/Text
 * @flow
 */
import * as React from 'react';
import toWebComponent from '../WebComponent';

const style = {
  color: 'red',
};

const Text = ({
  text,
}) => (
  <p style={style}>{text}</p>
);

export default toWebComponent(Text, {name: 'text-component', module});
