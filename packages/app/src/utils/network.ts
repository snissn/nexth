import { defineChain } from 'viem'

const fluence = defineChain({
  blockExplorers: { default : {name: "TBD", url: "https://place.holder.com"} } , // TODO
  rpcUrls: {
    default: {
      http: ['http://localhost:8010/proxy'] // need cors proxy
      // lcp --proxyUrl http://localhost:8745
    },
  },
  testnet: true,
  name: 'Fluence',
  nativeCurrency: {
    decimals: 18,
    name: 'Fluence',
    symbol: 'FLT',
  },
  id: 2443544213400835,
})

import { filecoinCalibration, polygonMumbai, localhost, Chain } from 'viem/chains'

let chains = [filecoinCalibration, polygonMumbai, fluence] as [Chain, ...Chain[]]
console.log('Chains', chains)

export const ETH_CHAINS = chains

export function GetNetworkColor(chain?: string) {
  if (chain === 'homestead') return 'green'
  if (chain === 'arbitrum') return 'blue'
  if (chain === 'optimism') return 'red'
  if (chain === 'matic') return 'purple'

  return 'grey'
}
