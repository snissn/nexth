
import SendToken from '../deposit-ether/SendToken.tsx'
import SendTokenUp from '../withdraw-ether/SendToken.tsx'
export default function Home() {
  return (
    <>
    <div className='flex-column align-center '>
      <div className='flex align-end grid md:grid-cols-1 lg:grid-cols-2 gap-4 '>
      <SendToken />
      <SendTokenUp />
    </div>
    </div>
    </>
  )
}
