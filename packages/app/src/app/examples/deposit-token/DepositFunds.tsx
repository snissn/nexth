// page.tsx
'use client'
import React, { useState, useEffect } from 'react'
import H1 from '../components/H1'
import TokenInput from '../components/TokenInput'
import RecipientInput from '../components/RecipientInput'
import Button from '../components/Button'
import BalanceDisplay from '../components/BalanceDisplay'
import TokenAmountInput from '../components/TokenAmountInput'
import Allowance from '../components/Allowance'

import {
  useAccount,
  useWriteContract,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useContractRead,
  useBalance,
} from 'wagmi'
import { useToast } from '@/context/Toaster'
import { useChainId } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { ethers } from 'ethers'

const fundAbi = [
  {
    inputs: [
      {
        components: [
          { internalType: 'uint64', name: 'root', type: 'uint64' },
          { internalType: 'address[]', name: 'route', type: 'address[]' },
        ],
        internalType: 'struct SubnetID',
        name: 'subnetId',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'uint8', name: 'addrType', type: 'uint8' },
          { internalType: 'bytes', name: 'payload', type: 'bytes' },
        ],
        internalType: 'struct FvmAddress',
        name: 'to',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'fundWithToken',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]

const subnetAddress = '0xb4dc563a3efafd02118b72ace6f51930e7daa18f' // TODO get from config
const subnetId = { root: 314159, route: [subnetAddress] }
const EAM_ACTOR = 10
const DELEGATED = 4

const encoder = new ethers.AbiCoder()

export default function DepositFunds() {
  const { address } = useAccount()
  const chainId = useChainId()
  const [to, setTo] = useState()
  const [amount, setAmount] = useState('0')
  const [allowance, setAllowance] = useState('0')
  const [tokenAddress, setTokenAddress] = useState('0x20c324EabcE392F2f58f7b5DDe8308CDA218F9c9') // TODO get from config

  const { open: openModal } = useWeb3Modal()

  const { showToast } = useToast()
  const contractAddress = '0xfA6D6c9ccDE5B8a34690F0377F07dbf932b457aC' // Gateway address on calibnet TODO get from config

  const fvmTo = address
    ? {
        addrType: DELEGATED,
        payload: encoder.encode(['bytes'], [ethers.solidityPacked(['uint8', 'bytes20'], [EAM_ACTOR, address])]),
      }
    : {}

  const contractCallArgs = {
    address: contractAddress,
    abi: fundAbi,
    functionName: 'fundWithToken',
    args: [subnetId, fvmTo, amount],
  }

  const { error: estimateError } = useSimulateContract(contractCallArgs)
  const { data, writeContract, isPending, error } = useWriteContract()
  console.log('estimate error', estimateError)

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

  const tokenDigits = balanceData ? balanceData.decimals : 0

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

  if (chainId == 314159) {
    return (
      <div className='flex-column align-center'>
        <H1 title='Deposit Funds' />
        <>
          <RecipientInput onRecipientChange={setTo} recipient={to} />
          <BalanceDisplay balanceData={balanceData} />
          <TokenAmountInput balanceData={balanceData} onAmountChange={setAmount} />
            <Allowance
              contractAddress={contractAddress}
              amount={amount}
              tokenAddress={tokenAddress}
              allowance={allowance}
              setAllowance={setAllowance}
              tokenDigits={tokenDigits}
            />
          <Button
            text='Send tokens'
            onClick={handleSendClick}
            isLoading={isPending}
            isDisabled={!to || !amount || amount === '0' || isPending || amount > ethers.parseUnits(allowance, tokenDigits) }
          />
        </>
      </div>
    )
  } else {
    return (
      <div className='flex-column align-center'>
        <H1 title='Deposit Funds' />
        <button className='btn mt-10 btn-wide w-[100%]' onClick={() => openModal({ view: 'Networks' })}>
          Connect to Calibration Network
        </button>
      </div>
    )
  }
}
