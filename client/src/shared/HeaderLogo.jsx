
import { FaDice } from 'react-icons/fa'

export default function HeaderLogo ({ className }) {
  return (
    <div className={`flex items-center font-bold text-white ${className}`}>
      <h1> Sprout<span className='text-red-900'>C</span>omp </h1>
      <FaDice />
    </div>
  )
}