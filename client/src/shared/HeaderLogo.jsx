
import { useNavigate } from 'react-router-dom'
import { FaDice } from 'react-icons/fa'

export default function HeaderLogo ({ className, redirect }) {
  const navigate = useNavigate(); 
  
  return (
    <div 
      onClick={() => {redirect && navigate('/')}}
      className={`flex items-center font-bold text-white ${className}`}
    >
      <h1> Sprout<span className='text-red-900'>C</span>omp </h1>
      <FaDice />
    </div>
  )
}