
import Fa from 'react'

export default function BottomBar ({children}) {
  return (
    <div
      className='
        flex-shrink-0 p-5 w-100 rounded-t-xl 
        text-primary font-bold 
        bg-primary shadow'
    >
      { children }
    </div>
  )
}