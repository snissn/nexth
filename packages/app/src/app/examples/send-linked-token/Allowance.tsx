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

const Allowance = ({ tokenAddress, contractAddress, amount }) => {
  const [allowance, setAllowance] = useState('0')
  const { address } = useAccount()
  console.log('tokenAddress', tokenAddress)
  console.log('contractAddress', contractAddress)

  const { showToast } = useToast()
  const { data: allowanceData, error: allowanceError } = useContractRead({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, contractAddress],
    watch: true,
  })

  console.log('allowanceData', allowanceData)

  useEffect(() => {
    if (allowanceError) {
      showToast({
        message: `Error fetching allowance: ${allowanceError.message}`,
        type: 'error',
      })
    } else if (allowanceData) {
      setAllowance(ethers.utils.formatUnits(allowanceData, 18))
    }
  }, [allowanceData, allowanceError, showToast])

  const x = useWriteContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'approve',
    args: [contractAddress, BigInt(87)] // amount ? ethers.utils.parseUnits(amount, 18) : ethers.constants.Zero],
  })


  const {
    writeContract: setAllowanceWrite,
    isPending: isPendingAllowance,
    error: setAllowanceError,
  } = useWriteContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'approve',
    args: [contractAddress, BigInt(87)] // amount ? ethers.utils.parseUnits(amount, 18) : ethers.constants.Zero],
  })

console.log("amount", amount);
console.log("amount23", setAllowanceWrite);
  const handleClickAllowance = () => {
    if (!amount || isNaN(amount)) {
      showToast({
        message: 'Invalid amount for setting allowance',
        type: 'error',
      })
      return
    }
    setAllowanceWrite()
  }

  useEffect(() => {
    if (allowanceError) {
      showToast({
        message: `Error fetching allowance: ${allowanceError.message}`,
        type: 'error',
      })
    } else if (allowanceData) {
      console.log('allowanceDataxyz', allowanceData)
      // Make sure the allowance is updated here
      const formattedAllowance = ethers.utils.formatUnits(allowanceData, 18)
      setAllowance(formattedAllowance)
    }
  }, [allowanceData, allowanceError, showToast])

  let allowanceDataStr = 'Fetching...'
  if (allowanceData || allowanceData == 0) {
    allowanceDataStr = ethers.utils.formatUnits(allowanceData, 18)
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
      <div>Allowance: {allowanceDataStr}</div>
      <Button
        text='Update allowance'
        onClick={handleClickAllowance}
        isLoading={isPendingAllowance}
        isDisabled={!amount || amount === '0' || isPendingAllowance}
      />
    </>
  )
}
export default Allowance
