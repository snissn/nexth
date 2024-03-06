import React from 'react'
import { isValidAddress } from '../utils/address'
import { Address } from '../types'

type TokenInputProps = {
  tokenAddress: Address
}

const TokenInput: React.FC<TokenInputProps> = ({ tokenAddress }) => {
  return (
    <label className='form-control w-full'>
      <div className='label'>
        <label className='text-xs font-medium text-gray-200'>ERC-20 Token address</label>
      </div>
      <div className='label mt-0'>
        <span className='label-text text-xs'>{tokenAddress}</span>
      </div>
    </label>
  )
}

export default TokenInput
