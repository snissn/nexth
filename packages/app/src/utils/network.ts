
import { defineChain } from 'viem'

const fluence = defineChain({
    rpcUrls: {
        default: {
            http: ["http://127.0.0.1:8745"]

        }
    },
    name : "Fluence",
    nativeCurrency: {
        decimals: 18, 
        name: "Fluence", 
        symbol: "FLT"
    },
    id: "0x482a2b14a7af",
    });

import { filecoinCalibration, polygonMumbai, localhost, Chain} from 'viem/chains';

let chains = [filecoinCalibration, polygonMumbai, fluence] as [Chain, ...Chain[]];



export const ETH_CHAINS = chains

export function GetNetworkColor(chain?: string) {
  if (chain === 'homestead') return 'green'
  if (chain === 'arbitrum') return 'blue'
  if (chain === 'optimism') return 'red'
  if (chain === 'matic') return 'purple'

  return 'grey'
}
