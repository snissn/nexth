import React, { useState, useEffect } from 'react';

type TokenAmountInputProps = {
  balance: bigint;
  decimals: number;
  onAmountChange: (amount: string) => void;
};

const TokenAmountInput: React.FC<TokenAmountInputProps> = ({ balance, decimals, onAmountChange }) => {
  const [amount, setAmount] = useState('');
  const [sliderValue, setSliderValue] = useState(0);

  const maxAmount = Number(balance) / Math.pow(10, decimals);

  useEffect(() => {
    onAmountChange(amount);
  }, [amount, onAmountChange]);

  const handleSliderChange = (value: number) => {
    const newAmount = (maxAmount * value / 100).toFixed(decimals);
    setAmount(newAmount);
    setSliderValue(value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numValue = Number(value);
    if (!isNaN(numValue) && numValue <= maxAmount) {
      setAmount(value);
      setSliderValue(numValue / maxAmount * 100);
    }
  };

  return (
    <div>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        className="range range-xs"
        step="1"
        onChange={(e) => handleSliderChange(Number(e.target.value))}
      />
      <input
        type="text"
        value={amount}
        placeholder="Amount"
        className="input input-bordered w-full max-w-xs"
        onChange={handleAmountChange}
      />
      <output className="px-2">{`${sliderValue}%`}</output>
    </div>
  );
};

export default TokenAmountInput;
