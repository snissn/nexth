// page.tsx
'use client'
import React, { useState, useEffect } from 'react';
import TokenInput from './TokenInput';
import RecipientInput from './RecipientInput';
import SendButton from './SendButton';
import BalanceDisplay from './BalanceDisplay';
import TokenAmountInput from './TokenAmountInput'; // Import the new component.
import { useTokenTransaction } from '../hooks/useTokenTransaction';
import { useToast } from '@/context/Toaster';
import { Address } from '../types';
import { useAccount } from 'wagmi';

export default function SendToken() {
  const { address } = useAccount();
  const [tokenAddress, setTokenAddress] = useState<Address>("0x721823209A298d4685142bebbbBF02d8907Eae17" as Address);
  const [to, setTo] = useState<Address>(address);
  const [amount, setAmount] = useState('0');

  const { showToast } = useToast();
  const {
    balanceData,
    estimateError,
    handleSendTransaction,
    txError,
    txSuccess,
    isLoading,
  } = useTokenTransaction(tokenAddress, to, amount, showToast);

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
          />
          <BalanceDisplay
            balanceData={balanceData}
          />
          <TokenAmountInput
            balance={balanceData ? balanceData.value : BigInt(0)}
            decimals={balanceData ? balanceData.decimals : 0}
            onAmountChange={setAmount}
          />
          <SendButton
            onClick={handleSendTransaction}
            isLoading={isLoading}
            isDisabled={!to || estimateError || amount === '0'}
          />
        </>
      )}
    </div>
  )
}


