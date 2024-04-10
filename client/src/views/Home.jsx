
import { 
  useNavigate,
  Link,
} from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

import BottomBar from '../shared/BottomBar.jsx'

/**
 * Home page
 */
export default function HomeView () {
  const navigate = useNavigate();
  
  return (
    <div className='h-full flex flex-col'> 
      <div className='p-5 overflow-auto flex-grow'>
        
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
              Listo <div className='transform rotate-45 translate-x-3 -translate-y-1 text-red-900'> ? </div> 
              Juguemos <div className='transform rotate-45 translate-x-3 translate-y-1 text-cyan-900'> !! </div>  
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
      <BottomBar/>
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