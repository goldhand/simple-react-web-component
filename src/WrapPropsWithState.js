import * as React from 'react';
import * as R from 'ramda';

export const createStore = () => {
  let counter = 0;
  let subscribers = {};
  const subscribe = R.curry((id, subscriber) => {
    subscribers[id] = subscriber;
    // return "unsubscribe" function
    return () => {
      delete subscribers[id];
    };
  });
  const dispatch = (id, props) => {
    if (subscribers[id]) subscribers[id](props);
  };
  const assignId = () => counter++;
  return {
    subscribe,
    dispatch,
    assignId,
  };
}

const wrapPropsWithState = UnwrappedComponent =>
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        props,
      };
    }
    componentDidMount() {
      const {subscribeToUpdates} = this.props;
      subscribeToUpdates(props => this.setState({props}));
    }
    render() {
      return <UnwrappedComponent {...this.state.props} />;
    }
  };

export default wrapPropsWithState;
