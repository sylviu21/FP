import React, { FC } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50'>
        <div className='w-full max-w-sm mx-auto bg-white  rounded-lg p-8'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-lg font-bold'>{title}</h2>
            <button
              className='text-gray-700 hover:text-gray-900'
              onClick={onClose}
            >
              X
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
