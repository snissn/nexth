import React from 'react';

type SendButtonProps = {
  isLoading: boolean;
  isDisabled: boolean;
  onClick: () => void;
};

const SendButton: React.FC<SendButtonProps> = ({ isLoading, isDisabled, onClick }) => (
  <button
    className='btn btn-wide w-[100%]'
    onClick={onClick}
    disabled={isDisabled}
  >
    {isLoading ? <span className='loading loading-dots loading-sm'></span> : 'Send tokens'}
  </button>
);

export default SendButton;

