'use client'
import { useState } from 'react'
import TokenInput from './TokenInput'
import RecipientInput from './RecipientInput'
import SendButton from './SendButton'
import BalanceDisplay from './BalanceDisplay'
import { useTokenTransaction } from '../hooks/useTokenTransaction'
import { useToast } from '@/context/Toaster'
import { Address } from '../types'

export default function SendToken() {
  const [tokenAddress, setTokenAddress] = useState<Address>(undefined)
  const [to, setTo] = useState<Address>(undefined)
  const [amount, setAmount] = useState('0.01')

  const { showToast } = useToast()
  const {
    balanceData,
    estimateError,
    handleSendTransaction,
    txError,
    txSuccess,
    isLoading,
  } = useTokenTransaction(tokenAddress, to, amount, showToast)

  console.log("useTokenTransaction", tokenAddress, to, amount, showToast);
  console.log(balanceData);


  return (
    <div className='flex-column align-center'>
      <h1 className='text-xl'>Send Linked ERC-20 Token To Fluence Subnet</h1>
      <TokenInput
        setTokenAddress={setTokenAddress}
        tokenAddress={tokenAddress}
      />
      {tokenAddress && (
        <>
          <RecipientInput
            onRecipientChange={setTo}
            recipient={to}
            setAmount={setAmount}
            amount={amount}
          />
          <BalanceDisplay
            balanceData={balanceData}
          />
          <SendButton
            onClick={handleSendTransaction}
            isLoading={isLoading}
            isDisabled={!to || estimateError || amount === ''}
          />
        </>
      )}
    </div>
  )
}
