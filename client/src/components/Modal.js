import React from 'react';
import ReactDOM from 'react-dom';
import history from '../history';

const Modal = (props) => {
    return ReactDOM.createPortal(
        <div className='ui dimmer modals visible active' onClick={props.onDismiss}>
            <div className='ui standard modal visible active' onClick={(e) => {e.stopPropagation()}}>
                <div className='header'>{props.title}</div>
                <div className='content'>{props.description}</div>
                {props.actions}
            </div>
        </div>,
        document.querySelector('#modal')
    )
}

export default Modal;