/**
 * @module {Function} components/Timer
 * @flow
 */
import * as React from 'react';
import toWebComponent from '../WebComponent';

const styles = {
  label: {
    color: 'orange',
  },
  container: {
    border: '1px dotted orange',
    padding: '10px',
  },
  timer: {
    color: 'brown',
    fontSize: '2em',
  },
};

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.start || 0,
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        count: this.state.count + 1,
      })
    }, this.props.intervalTime || 1000)
  }
  render() {
    return (<span style={styles.timer}>{this.state.count}</span>);
  }
}

const TimerDisplay = ({
  text,
  intervalTime,
  start,
}) => (
  <div style={styles.container}>
    <p style={styles.label}>{text}</p>
    <Timer intervalTime={intervalTime} start={start} />
  </div>
);

export default toWebComponent(TimerDisplay, {name: 'timer-component', module});
