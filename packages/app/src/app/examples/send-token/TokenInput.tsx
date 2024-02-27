import React from 'react'
import { isValidAddress } from '../utils/address'
import { Address } from '../types'

type TokenInputProps = {
  setTokenAddress: (address: Address) => void,
  tokenAddress: Address,
}

const TokenInput: React.FC<TokenInputProps> = ({ setTokenAddress, tokenAddress }) => {
  return (
    <label className='form-control w-full mt-10'>
      <div className='label'>
        <span className='label-text'>ERC-20 Token address</span>
      </div>
      <div className='label'>
        <span className='label-text'>{tokenAddress}</span>
      </div>
    </label>
  )
}

export default TokenInput
