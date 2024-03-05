
import SendToken from '../send-linked-token/SendToken.tsx'
import SendTokenUp from '../destroy-linked-token/SendTokenUp.tsx'
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
