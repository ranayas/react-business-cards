import { Component } from "react";
import { createPortal } from "react-dom";
import "./styles/Modal.css";

const modalRoot = document.getElementById("modal-root");

class Modal extends Component {
  el = document.createElement("div");

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return createPortal(
      <div className="modal">{this.props.children}</div>,
      this.el
    );
  }
}

export default Modal;
