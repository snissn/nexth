import React from 'react'
import { isValidAddress } from '../utils/address'
import { Address } from '../types'

type TokenInputProps = {
  setTokenAddress: (address: Address) => void,
  tokenAddress: Address,
}

const TokenInput: React.FC<TokenInputProps> = ({ setTokenAddress, tokenAddress }) => {
  const handleTokenAddressInput = (token: string) => {
    const formattedToken = token.startsWith('0x') ? token : `0x${token}`
    setTokenAddress(formattedToken as Address)
    isValidAddress(formattedToken) // You may use this for validation feedback
  }

  return (
    <label className='form-control w-full mt-10'>
      <div className='label'>
        <span className='label-text'>ERC-20 Token address</span>
      </div>
      <input
        type='text'
        placeholder='0x...'
        className={`input input-bordered w-full ${
          !isValidAddress(tokenAddress) && tokenAddress ? 'input-error' : ''
        }`}
        onChange={(e) => handleTokenAddressInput(e.target.value)}
      />
    </label>
  )
}

export default TokenInput
