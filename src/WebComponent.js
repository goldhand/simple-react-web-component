import * as React from 'react';
import ReactDOM from 'react-dom';
import {hot} from "react-hot-loader";
import * as R from 'ramda';
import slotChildren, {createChildSlot} from './SlotChildren';
import wrapPropsWithState, {createStore} from './WrapPropsWithState';

const toWebComponent = (UnwrappedComponent, options = {}) => {

  const store = createStore();
  const Component = wrapPropsWithState(
    slotChildren(
      // enable hot reloading in each react tree
      hot(options.module || module)(UnwrappedComponent),
    options),
  );

  class WebComponent extends HTMLElement {
    constructor(...args) {
      super(...args);
      this.name = options.name;
      this.mountPoint = document.createElement('span');
      this.shadow = this.attachShadow({mode: 'open'});
      this.childMount = createChildSlot(options.name);
      this._subscribeId = `${options.name}-${store.assignId()}`;
    }
    get props() {
      return this._props;
    }
    set props(props) {
      this._props = props;
      this.update();
    }
    get parent() {
      return this._parent;
    }
    set parent(parent) {
      this.path = parent.path
        ? `${parent.path}.${this.name}`
        : parent.name;
      this._parent = parent;
    }
    connectedCallback() {
      this.appendChild(this.childMount);
      this.shadow.appendChild(this.mountPoint);

      ReactDOM.render(
        <Component {...this.props} subscribeToUpdates={store.subscribe(this._subscribeId)} />,
        this.mountPoint,
      );
    }
    update() {
      // force react to calculate new state
      store.dispatch(this._subscribeId, this.props);
    }
  }

  // Add WebComponent to registry
  customElements.define(options.name, WebComponent);

  const renderElement = R.curry((props, parent) => {
    const component = document.createElement(options.name);
    component.props = props;
    component.parent = parent;
    parent.childMount.appendChild(component);
    // just for fun
    if (component.path) console.log(component.path); // eslint-disable-line no-console
    return component;
  });
  renderElement.Close = (child) => {
    if (child && child.parent) {
      return child.parent;
    } else {
      console.info('no parent to return, must be the end...'); // eslint-disable-line no-console
    }
  };
  renderElement.AndClose = R.curry((props, parent) => {
    renderElement(props, parent);
    return parent;
  });

  return renderElement;
};

export default toWebComponent;
