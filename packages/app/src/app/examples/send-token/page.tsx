// page.tsx
'use client'
import React, { useState } from 'react';
import TokenInput from './TokenInput';
import RecipientInput from './RecipientInput';
import SendButton from './SendButton';
import BalanceDisplay from './BalanceDisplay';
import TokenAmountInput from './TokenAmountInput';
import { useAccount, useWriteContract } from 'wagmi';
import { useToast } from '@/context/Toaster';
import { useBalance } from 'wagmi'
import { ethers } from 'ethers';
import { parseAbi } from 'viem'



export default function SendToken() {
  const { address } = useAccount();
  const [tokenAddress, setTokenAddress] = useState("0x721823209A298d4685142bebbbBF02d8907Eae17");
  const [to, setTo] = useState(address);
  const [amount, setAmount] = useState('0');
  const { showToast } = useToast();

  const sendLinkedTokenAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "linkedTransfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

  const contractAddress = "0x3BB90607666d51aF3d3c57e7ee6F7cc8b40490b6"; //TODO get from config

  const { writeContract, isPending, error} = useWriteContract()

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
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c1',
      abi: parseAbi(['function mint(uint256 tokenId)']),
      functionName: 'mint',
      args: [BigInt(7)],
    })
  };

  const { data: balanceData } = useBalance({
    address: address,
    token: tokenAddress
    })

  return (
    <div className='flex-column align-center'>
      <h1 className='text-xl'>Send Linked ERC-20 Token</h1>
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
              onClick={handleSendClick}
              isLoading={isPending}
              isDisabled={!to || !amount || amount === '0' || isPending}
            />
        </>
      )}
    </div>
  );
}

