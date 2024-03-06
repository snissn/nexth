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
import { parseEther } from 'viem'

const Allowance = ({ tokenAddress, contractAddress, amount, allowance, setAllowance }) => {
  const { address } = useAccount()

  const tokenDigits = 18 // TODO get from config

  const { showToast } = useToast()
  const { data: allowanceData, error: allowanceError } = useContractRead({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, contractAddress],
    watch: true,
  })

  const { error: estimateError } = useSimulateContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, contractAddress],
  })
  const y = useSimulateContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, contractAddress],
  })
  console.log(y)

  console.log('estimateError', estimateError)

  useEffect(() => {
    if (estimateError) {
      showToast(`Transaction failed: ${estimateError.cause}`, {
        type: 'error',
      })
      return
    }
    if (allowanceError) {
      showToast({
        message: `Error fetching allowance: ${allowanceError.message}`,
        type: 'error',
      })
    } else if (allowanceData) {
      setAllowance(ethers.formatUnits(allowanceData, tokenDigits))
    }
  }, [allowanceData, allowanceError, showToast, estimateError])

  const {
    writeContract: writeContract,
    isPending: isPendingAllowance,
    error: setAllowanceError,
  } = useWriteContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'approve',
    args: [contractAddress!, amount],
  })

  ///// new stuff ---
  const handleClickAllowance = () => {
    if (estimateError) {
      showToast(`Transaction failed: ${estimateError.cause}`, {
        type: 'error',
      })
      return
    }
    writeContract({
      address: tokenAddress!,
      abi: erc20Abi,
      functionName: 'approve',
      args: [contractAddress!, amount],
    })
  }

  // estimateError

  ///// end new stuff ....

  useEffect(() => {
    if (allowanceError) {
      showToast({
        message: `Error fetching allowance: ${allowanceError.message}`,
        type: 'error',
      })
    } else if (allowanceData) {
      // Make sure the allowance is updated here
      const formattedAllowance = ethers.formatUnits(allowanceData, tokenDigits)
      setAllowance(formattedAllowance)
    }
  }, [allowanceData, allowanceError, showToast])

  let allowanceDataStr = 'Fetching...'
  if (allowanceData || allowanceData == 0) {
    allowanceDataStr = ethers.formatUnits(allowanceData, tokenDigits)
  }

  useEffect(() => {
    if (setAllowanceError) {
      showToast({
        message: `Error setting allowance: ${setAllowanceError.message}`,
        type: 'error',
      })
    }
  }, [setAllowanceError, showToast])

  return (
    <>
    <label className='form-control w-full'>
      <div className='label'>
      <label className="font-medium text-gray-200">
    Allowance:
      </label>
      </div>
      <div className='label mt-0'>
        <span className='label-text font-medium'>{allowanceDataStr}</span>
      </div>
    </label>
      <Button
        text='Update allowance'
        onClick={handleClickAllowance}
        isLoading={isPendingAllowance}
        isDisabled={!amount || amount === '0' || isPendingAllowance || amount <= allowanceData}
      />
    </>
  )
}
export default Allowance
