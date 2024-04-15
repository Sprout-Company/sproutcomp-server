
import { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaArrowRight, FaUserPlus } from 'react-icons/fa'

import { UserContext } from '../ctx/User.jsx'
import Navbar from '../shared/Navbar.jsx'
import HeaderLogo from '../shared/HeaderLogo.jsx'
import List from '../ui/List.jsx'

  /**
 * Welcome page
 */
export default function WelcomeView () {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  
  return (
    <div className='h-full flex flex-col'> 
      <Navbar className='flex justify-between items-center'>
        <HeaderLogo className='text-2xl' redirect/>
        <div 
          className='text-xl rounded-3xl border border-2 border-current p-2'
          children={<FaUserPlus/>}
          onClick={() => navigate('/login')}
        />
      </Navbar>
      
      <div className='p-5 overflow-auto flex-grow'>
        <List list={["HOLS", "BESTIIA"]}/>
        <HeaderAndBody
          header='Has tus inversiones más entretenidas'
          body='
            Te ofrecemos una forma divertida de aumentar tus fondos con juegos de azar
            y apuestas amigable con tu bolsillo
          '
        />
        
        <HeaderAndBody
          className='mt-12'
          header={
            <span className='flex flex-wrap'> 
              Listo <span className='mr-3 text-red-900'> ? </span> 
              Juguemos <span className='  text-cyan-900'> !! </span>  
            </span>
          }
          body='Unete a nosotros y empieza a ganar dinero jugando !'
        />
        
        <div className='flex'>
          <Link 
            to='/login'
            className='
              flex items-center
              px-6 mt-6 text-xl text-primary 
              border-b border-current
            ' 
          > 
            <p> Comenzar </p>
            <FaArrowRight className='ml-3 animate-point-right'/> 
          </Link>  
        </div>
        
      </div>
    </div>
  )
}

/**
 * Informative fragment
 * @private
 */
function HeaderAndBody ({className, header, body}) {
  return (
    <div className={className}>
      <h1 className='text-primary border-l-current mx-2 my-5 text-4xl font-bold'>
        { header }
      </h1>
      <p className='text-body'>
        { body }
      </p>
    </div>
  )
}