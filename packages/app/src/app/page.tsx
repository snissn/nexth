import { CardList } from '@/components/CardList'

import EtherIcon from '@/assets/icons/ethereum.png'
import TokenIcon from '@/assets/icons/token.png'

const ExampleItems = [
  {
    title: 'Manage Linked USDC Tokens',
    description: 'Use IPC to send axelar USDC to your Fluence subnet',
    image: EtherIcon.src,
    url: '/examples/linked-token',
  },
  {
    title: 'Send Funds between Subnets (Token)',
    description: 'Sending tokens on the parent subnet that are minted as native currency on the subnet.',
    image: EtherIcon.src,
    url: '/examples/deposit-token',
  },
  {
    title: 'Send Funds between Subnets (Native)',
    description: 'Sending native value to an IPC subnet',
    image: EtherIcon.src,
    url: '/examples/deposit-native',
  },
  {
    title: 'Fund Token based Subnet with Axelar ERC20 Token',
    description:
      'With a test Fluent token hosted on mumbai - use axelar to bridge the token to filecoin calibration and a token funded IPC subnet',
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
