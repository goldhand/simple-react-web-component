import * as React from 'react';
import toWebComponent from './WebComponent';

const styles = {
  greeting: {
    color: 'green',
  },
  user: {
    color: 'blue',
  }
};

const Greet = ({
  user,
  greeting,
  attrs,
}) => (
  <div>
    <h1 style={styles.greeting}>{greeting}</h1>
    <h3 style={styles.user}>{user}</h3>
    <ul>
      {attrs
        ? attrs.map(attr => <li key={attr.name}>{attr.name + ': ' + attr.value}</li>)
        : null
      }
    </ul>
  </div>
);

export default toWebComponent(Greet, 'greet-react');
