import React, { Component} from "react";
import {hot} from "react-hot-loader";

import Greet from './Greet';

const greetProps = {user: 'Will', greeting: 'Hello Good Sir!', attrs: [
  {name: 'height', value: '6 feet'},
  {name: 'hair', value: 'blond'},
  {name: 'weight', value: 'too much'},
]};

const greetWill = (mountPoint) => Greet(greetProps, mountPoint);

class App extends Component {


  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // greetWill(this.greetMount);
    this.greetComp.props = greetProps;
    this.greetComp.update();
    // console.log(this.greetComp, this.greetComp.props);
    // this.forceUpdate();
  }

  render(){

    return(
      <div className="App">
        <h1> Hello, World! </h1>
        <div ref={c => this.greetMount = c} />
        <greet-react ref={c => this.greetComp = c} />
      </div>
    );
  }
}

export default hot(module)(App);
