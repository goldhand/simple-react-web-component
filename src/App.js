import * as React from 'react';
import * as R from 'ramda';
import Greet from './components/Greet';
import Header from './components/Header';
import Container from './components/Container';
import Text from './components/Text';

const greetProps = {
  user: 'Will', greeting: 'Hello Good Sir!', attrs: [
    {name: 'height', value: '6 feet'},
    {name: 'hair', value: 'blond'},
    {name: 'weight', value: 'HEY EASY BUDDY!'},
  ],
};
const headerProps = {text: 'I am Header'};
const textProps = {text: 'I am text'};
const containerProps = {children: 'childen container prop'};

const renderApp = R.pipe(
  Container(containerProps),
    Header.AndClose(headerProps),
    Text.AndClose(textProps), Text.Close,
    Greet(greetProps),
      Container(containerProps),
        Text.AndClose({text: 'I am inside "Container.Greet.Container"'}),
        Container.AndClose({children: <h3>React and JSX still work</h3>}),
      Container.Close,
    Greet.Close,
  Container.Close,
);

export default childMount => renderApp({childMount, name: 'App'});
