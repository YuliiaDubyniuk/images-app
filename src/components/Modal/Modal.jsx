import { useEffect } from 'react';
import { Overlay } from './Modal.styled';

export const Modal = ({largeImg, onClose}) => {
  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

 const handleEsc = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = evt => {
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
