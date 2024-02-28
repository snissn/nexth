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
import { erc20Abi } from 'viem';

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
  const [tokenAddress, setTokenAddress] = useState('0x721823209A298d4685142bebbbBF02d8907Eae17')
  const [to, setTo] = useState(address)
  const [amount, setAmount] = useState('0')
  const [allowance, setAllowance] = useState('0');

  const { showToast } = useToast()
  const contractAddress = '0x3BB90607666d51aF3d3c57e7ee6F7cc8b40490b6' //TODO get from config

  const { data: allowanceData, error: allowanceError } = useContractRead({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, contractAddress],
    watch: true,
  })
  console.log("allowanceData", allowanceData);

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

  const {
    write: setAllowanceWrite,
    isLoading: isAllowanceLoading,
    error: setAllowanceError,
  } = useWriteContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'approve',
    args: [contractAddress, amount ? ethers.utils.parseUnits(amount, 18) : ethers.constants.Zero],
  })

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
    });
  } else if (allowanceData) {
      console.log(allowanceData);
    // Make sure the allowance is updated here
    const formattedAllowance = ethers.utils.formatUnits(allowanceData, 18);
    setAllowance(formattedAllowance);
  }
}, [allowanceData, allowanceError, showToast]);

  let allowanceDataStr = 'Fetching...';
  if (allowanceData || allowanceData == 0 ) {
    allowanceDataStr = ethers.utils.formatUnits(allowanceData, 18);
  }

  useEffect(() => {
    if (setAllowanceError) {
      showToast({
        message: `Error setting allowance: ${setAllowanceError.message}`,
        type: 'error',
      })
    }
  }, [setAllowanceError, showToast])

  const { error: estimateError } = useSimulateContract({
    address: contractAddress,
    abi: sendLinkedTokenAbi,
    functionName: 'linkedTransfer',
    args: [to!, BigInt(7)],
  })

  const { data, writeContract, isPending, error } = useWriteContract()

  const { dataAllowance, writeContractAllowance, isPendingAllowance, errorAllowance } = useWriteContract()

  const {
    isLoading,
    error: txError,
    isSuccess: txSuccess,
  } = useWaitForTransactionReceipt({
    hash: data,
  })

  const handleSendClick = async () => {
    /*
    writeContract({
    address: contractAddress,
    //abi: parseAbi(['function linkedTransfer(address recipient, uint256 tokenId)']),
  abi: parseAbi(['function mint(uint256 tokenId)']),
    functionName: 'mint',
    //args: [to, BigInt(1)], //ethers.utils.parseUnits(amount, 18)],
    args: [ BigInt(1)],
  });
    */
    writeContract({
      address: contractAddress,
      abi: sendLinkedTokenAbi,
      functionName: 'linkedTransfer',
      args: [to!, BigInt(7)],
    })
  }

  const { data: balanceData } = useBalance({
    address: address,
    token: tokenAddress,
  })

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
      <TokenInput setTokenAddress={setTokenAddress} tokenAddress={tokenAddress} />
      {tokenAddress && (
        <>
          <RecipientInput onRecipientChange={setTo} recipient={to} />
          <BalanceDisplay balanceData={balanceData} />
          <div>Allowance: {allowanceDataStr}</div>
          <Button
            text='Update allowance'
            onClick={handleClickAllowance}
            isLoading={isPendingAllowance}
            isDisabled={!to || !amount || amount === '0' || isPendingAllowance}
          />
          <TokenAmountInput
            balance={balanceData ? balanceData.value : BigInt(0)}
            decimals={balanceData ? balanceData.decimals : 0}
            onAmountChange={setAmount}
          />
          <Button
            text='Send tokens'
            onClick={handleSendClick}
            isLoading={isPending}
            isDisabled={!to || !amount || amount === '0' || isPending}
          />
        </>
      )}
    </div>
  )
}
