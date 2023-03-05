import { Component } from "react";
import { ModalImg, ModalWindow, Overlay } from "./Modal.style"

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
        return (
            <Overlay onClick={this.handleBackdropClick}>
                <ModalWindow >
                    <ModalImg src={imgUrl} alt="picture" />
                </ModalWindow>
            </Overlay>
        )
    }
}