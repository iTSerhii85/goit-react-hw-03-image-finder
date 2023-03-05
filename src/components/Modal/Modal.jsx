import { Component } from "react";
import { createPortal } from "react-dom";
import { ModalImg, ModalWindow, Overlay } from "./Modal.style"

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
    
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    };

    handleKeyDown = evt => {
        if (evt.code === 'Escape') {
            this.props.CloseModal();
        }
    };
    
    handleBackdropClick = evt => {
        if (evt.currentTarget === evt.target) {
            this.props.CloseModal();
        }
    };

    render (){
        const {imgUrl} = this.props
        return createPortal(
            <Overlay onClick={this.handleBackdropClick}>
                <ModalWindow >
                    <ModalImg src={imgUrl} alt="picture" />
                </ModalWindow>
            </Overlay>,
            modalRoot
        )
    }
}