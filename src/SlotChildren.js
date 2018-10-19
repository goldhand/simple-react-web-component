import * as React from 'react';
import {hot} from "react-hot-loader";

const slotChildren = (UnwrappedComponent, options = {}) => {
  // enable hot reloading in each react tree
  const Component = hot(options.module || module)(UnwrappedComponent);
  const slotName = `slot-${options.name}`;

  class SlotWrapper extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      const {children, ...props} = this.props;
      return (
        <Component {...props}>
          {children}
          <slot name={slotName} />
        </Component>
      );
    }
  }
  SlotWrapper.displayName = `SlotChildren(${Component.displayName || Component.name || '[component]'})`;
  SlotWrapper.createChildSlot = () => {
    const childSlot = document.createElement('span');
    childSlot.setAttribute('slot', slotName);
    return childSlot;
  };
  return SlotWrapper;
};

export default slotChildren;
