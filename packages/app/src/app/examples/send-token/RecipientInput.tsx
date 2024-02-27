import React from 'react';

type RecipientInputProps = {
  recipient: string;
  isValidRecipient: boolean;
  onRecipientChange: (recipient: string) => void;
};

const RecipientInput: React.FC<RecipientInputProps> = ({ recipient, isValidRecipient, onRecipientChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRecipientChange(event.target.value);
  };

  return (
    <label className='form-control w-full max-w-xs'>
      <div className='label'>
        <span className='label-text'>Recipient address</span>
      </div>
      <input
        type='text'
        placeholder='0x...'
        value={recipient || ''}
        className={`input input-bordered w-full max-w-xs ${
          !isValidRecipient && recipient !== '' ? 'input-error' : ''
        }`}
        onChange={handleChange}
      />
    </label>
  );
};

export default RecipientInput;
