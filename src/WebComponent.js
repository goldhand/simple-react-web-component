import * as React from 'react';
import ReactDOM from 'react-dom';

const toWebComponent = (Component, name) => {

  class WebComponent extends HTMLElement {

    constructor(...args) {
      super(...args);
      this.mountPoint = document.createElement('span');
    }

    get props() {
      return this._props;
    }

    set props(props) {
      if (this._isRendered) {
        this._props = props;
        this.update();
      } else {
        this._props = props;
      }
    }

    connectedCallback() {
      this.attachShadow({mode: 'open'}).appendChild(this.mountPoint);
      ReactDOM.render(
        <Component {...this.props}  />,
        this.mountPoint,
      );
      this._isRendered = 1;
    }

    update() {
      ReactDOM.unmountComponentAtNode(this.mountPoint);
      ReactDOM.render(<Component {...this.props} />, this.mountPoint);
    }
  }

  customElements.define(name, WebComponent);

  return (props, mountPoint) => {
    const component = document.createElement(name);
    if (props) component.props = props;
    if (mountPoint) mountPoint.appendChild(component);
    return component;
  }
};

export default toWebComponent;
