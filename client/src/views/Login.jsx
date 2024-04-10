
import { FaUser, FaDice } from 'react-icons/fa'
import HeaderLogo from '../shared/HeaderLogo.jsx'
import AuthButton from '../ui/AuthButton.jsx'
import bgPrimaryImg from '../assets/bg-primary.jpg'

export default function LoginView () {
  return (
    <div 
      className="h-full flex flex-col justify-center items-center"
    > 
      {/* background */}
      <div 
        className='z-0 absolute bg-cover bg-center opacity-10 h-full w-full'
        style={{backgroundImage: `url(${bgPrimaryImg})`}}
      />
      
      {/* form */}
      <div className='z-1 relative flex flex-col items-center'>
        <HeaderLogo 
          className='text-3xl'
          redirect
        />
        <h1 className='m-3 text-lg'> Iniciar sesión </h1>
        <AuthButton type='google' />
        <AuthButton type='facebook' /> 
      </div>
      
    </div>
  )
}