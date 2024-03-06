import SendToken from '../send-linked-token/SendToken.tsx'
import SendTokenUp from '../destroy-linked-token/SendTokenUp.tsx'

export default function Home() {
  return (
    <>
      <div className='flex-column align-center '>
        <div className='flex w-full'>
          <div className='flex p-10 w-1/2 card bg-base-300 rounded-box place-items-center'>
            <SendToken />
          </div>
          <div className='divider divider-horizontal'></div>
          <div className='flex p-10 w-1/2 card bg-base-300 rounded-box place-items-center'>
            <SendTokenUp />
          </div>
        </div>
      </div>
    </>
  )
}
