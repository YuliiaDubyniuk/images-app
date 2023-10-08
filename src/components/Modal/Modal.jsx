import { Component } from "react";
import { Overlay } from "./Modal.styled";

export class Modal extends Component {
    componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
  }

  handleEsc = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

    render() {
        return (
            <Overlay onClick={this.handleBackdropClick}>
                <div className="modal">
                    <img src={this.props.largeImg} alt="" />
                </div>
            </Overlay>
    
        )
    }
    
}