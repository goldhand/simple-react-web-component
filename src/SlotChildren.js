import * as React from 'react';

const getSlotName = name => `slot-${name}`;

export const createChildSlot = name => {
  const childSlot = document.createElement('span');
  childSlot.setAttribute('slot', getSlotName(name));
  return childSlot;
};

const slotChildren = (UnwrappedComponent, options = {}) => {
  class SlotWrapper extends React.Component {
    render() {
      const {children, ...props} = this.props;
      return (
        <UnwrappedComponent {...props}>
          {children}
          <slot name={getSlotName(options.name)} />
        </UnwrappedComponent>
      );
    }
  }
  SlotWrapper.displayName = `SlotChildren(${UnwrappedComponent.displayName || UnwrappedComponent.name || '[component]'})`;
  return SlotWrapper;
};

export default slotChildren;
