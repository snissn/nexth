import { CardList } from '@/components/CardList'

import EtherIcon from '@/assets/icons/ethereum.png'
import TokenIcon from '@/assets/icons/token.png'

const ExampleItems = [
  {
    title: 'Manage Linked USDC Tokens',
    description: 'Send axelarUSDC tokens from Filecoin Calibration to the Fluence IPC Subnet using IPC Linked Token',
    image: EtherIcon.src,
    url: '/examples/linked-token',
  },
  {
    title: 'Send Funds between Subnets (Token)',
    description: 'Fund and withdraw Fluent Tokens from Ipc Subnet and Filecoin Calibration',
    image: EtherIcon.src,
    url: '/examples/deposit-token',
  },
  {
    title: 'Send Funds between Subnets (Native)',
    description: 'Fund and withdraw native tFIL from IPC subnet.',
    image: EtherIcon.src,
    url: '/examples/deposit-native',
  },
  {
    title: 'Fund Token based Subnet with Axelar ERC20 Token (TODO)',
    description: 'Bridge Mumbai Fluent token to Filecoin Calibration and a token funded IPC subnet using Axelar',
    image: TokenIcon.src,
    url: '/examples/axelar-token',
  },
]

export default function Home() {
  return (
    <>
      <h2 className='text-xl'>Nexth Examples</h2>

      <p className='mb-4'>
        All these examples can be found in the main repo at <code>src/app/examples</code> to help you bootstrap
        development. You can delete the entire folder before deploying your own App.
      </p>

      <CardList title='Examples' items={ExampleItems} />
    </>
  )
}
