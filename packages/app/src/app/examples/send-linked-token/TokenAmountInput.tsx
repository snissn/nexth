'use client'
import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'

type TokenAmountInputProps = {
  balance: bigint
  decimals: number
  onAmountChange: (amount: string) => void
}

const TokenAmountInput: React.FC<TokenAmountInputProps> = ({ balance, decimals, onAmountChange, tokenDigits }) => {
  const [amount, setAmount] = useState('')
  const [sliderValue, setSliderValue] = useState(0)

  const maxAmount = Number(balance) / Math.pow(10, decimals)

  useEffect(() => {
    onAmountChange(amount)
  }, [amount, onAmountChange])

  const handleSliderChange = (value: number) => {
    const newAmount = (BigInt(value) * balance) / BigInt(100)

    console.log('AMOUNT', newAmount)
    setAmount(newAmount)
    setSliderValue(value)
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const numValue = Number(value)
    if (!isNaN(numValue) && numValue <= maxAmount) {
      setAmount(value)
      setSliderValue((numValue / maxAmount) * 100)
    }
  }

  return (
  <>
  <div className="flex flex-col items-center space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-200">
        Amount to withdraw:
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          type='text'
          value={amount ? ethers.formatUnits(amount, tokenDigits) : 0}
          placeholder='Amount'
          className='input input-bordered w-full max-w-xs rounded-r-none text-gray-300'
          onChange={handleAmountChange}
        />
        <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 input-bordered bg-gray-850 text-gray-300 text-sm">
          USDC
        </span>
      </div>
    </div>
    </div>
    <div className="flex items-center m-1">
      <input
        type='range'
        min='0'
        max='100'
        value={sliderValue}
        className='range range-xs'
        step='1'
        onChange={(e) => handleSliderChange(Number(e.target.value))}
      />
      <output className='px-2'>{`${sliderValue}%`}</output>
    </div>
  </>
)

}

export default TokenAmountInput
