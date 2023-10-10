import { useEffect } from 'react';
import { Overlay } from './Modal.styled';

export const Modal = () => {
  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  handleEsc = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };
  return (
    <Overlay onClick={handleBackdropClick}>
      <div className="modal">
        <img src={largeImg} alt="" />
      </div>
    </Overlay>
  );
};
