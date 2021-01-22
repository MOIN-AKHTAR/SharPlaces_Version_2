import React from 'react';
import Backdrop from './BackDrop';
import style from './Model.module.css';

const ModalOverlay = props => {
    return (
    <div className={`${style.modal} ${props.className}`} style={props.style}>
      <header className={`${style.modal__header} ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : event => event.preventDefault()
        }
      >
        <div className={`${style.modal__content} ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`${style.modal__footer} ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
};

const Modal = props => {
  return (
    <React.Fragment>
      {props.show&&<Backdrop onClick={props.onCancel} />}
        {props.show&&<ModalOverlay 
        {...props}
        style={{transform:"translateY(0)",opacity:"1"}}
         />}
    </React.Fragment>
  );
};

export default Modal;
