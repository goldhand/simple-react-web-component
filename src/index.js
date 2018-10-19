import Greet from './Greet';

const mountPoint = document.getElementById("root");
const greetProps = {
  user: 'Will', greeting: 'Hello Good Sir!', attrs: [
    {name: 'height', value: '6 feet'},
    {name: 'hair', value: 'blond'},
    {name: 'weight', value: 'HEY EASY BUDDY!'},
  ],
};

// const greetUser = Greet();
// greetUser.props = greetProps;
// mountPoint.appendChild(greetUser);
// -- or --
Greet(greetProps, mountPoint);
