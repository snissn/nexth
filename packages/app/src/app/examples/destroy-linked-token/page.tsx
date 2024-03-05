// page.tsx
'use client'
import React, { useState, useEffect } from 'react'
import TokenInput from './TokenInput'
import RecipientInput from './RecipientInput'
import Button from './Button'
import BalanceDisplay from './BalanceDisplay'
import TokenAmountInput from './TokenAmountInput'
import { useAccount, useWriteContract, useSimulateContract, useWaitForTransactionReceipt, useContractRead } from 'wagmi'
import { useToast } from '@/context/Toaster'
import { useBalance } from 'wagmi'
import { ethers } from 'ethers'
import { parseAbi } from 'viem'
import { erc20Abi } from 'viem'

const sendLinkedTokenAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'linkedTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export default function SendToken() {
  const { address } = useAccount()
  const [tokenAddress, setTokenAddress] = useState('0x427eD285e9d0662D4859a891499Fe3614CC8F7D1') // TODO get from config
  const [to, setTo] = useState()
  const [amount, setAmount] = useState('0')

  const { showToast } = useToast()
  const contractAddress = '0x427eD285e9d0662D4859a891499Fe3614CC8F7D1' // TODO get from config

  const tokenDigits = 18 // TODO get from config

  const contractCallArgs = {
    address: contractAddress,
    abi: sendLinkedTokenAbi,
    functionName: 'linkedTransfer',
    args: [to!, amount],
  }

  const { error: estimateError } = useSimulateContract(contractCallArgs)
  const { data, writeContract, isPending, error } = useWriteContract()

  const {
    isLoading,
    error: txError,
    isSuccess: txSuccess,
  } = useWaitForTransactionReceipt({
    hash: data,
  })

  const handleSendClick = async () => {
    writeContract(contractCallArgs)
  }

  const { data: balanceData } = useBalance({
    address: address,
    token: tokenAddress,
  })

  useEffect(() => {
    setTo(address)
  }, [address])

  useEffect(() => {
    if (txSuccess) {
      showToast(`Transaction successful`, {
        type: 'success',
      })
    } else if (txError) {
      showToast(`Transaction failed: ${txError.cause}`, {
        type: 'error',
      })
    }
  }, [txSuccess, txError])

  return (
    <div className='flex-column align-center'>
      <h1 className='text-xl'>Send Linked ERC-20 Token</h1>
      <TokenInput />
      {tokenAddress && (
        <>
          <RecipientInput onRecipientChange={setTo} recipient={to} />
          <BalanceDisplay balanceData={balanceData} />
          <TokenAmountInput
            balance={balanceData ? balanceData.value : BigInt(0)}
            decimals={balanceData ? balanceData.decimals : 0}
            onAmountChange={setAmount}
          />
          <Button
            text='Send tokens'
            onClick={handleSendClick}
            isLoading={isPending}
            isDisabled={
              !to || !amount || amount === '0' || isPending || amount > ethers.parseUnits(allowance, tokenDigits)
            }
          />
        </>
      )}
    </div>
  )
}
