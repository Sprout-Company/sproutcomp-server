
import { useState, useRef } from 'react'
import { useLocation, Link} from 'wouter'

import { useUserStore } from '@/stores'
import { setTitle } from '@/utils'
import { 
  FaArrowRight, 
  FaUser,
  FaInfo,
  FaDollarSign,
  FaSignOutAlt,
} from 'react-icons/fa'
 
import {
  List,
  FloatingMenu,
} from '@/ui'
import { WelcomePage } from './Welcome.jsx'
import { HeaderLogo, Navbar } from '@/shared'

/**
 * Home page
 */
export function HomePage () {
  const userName = useUserStore(s => s.name);
  const [,navigate] = useLocation();
  const profileBtnRef = useRef(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
 
  setTitle('Sproutcomp | Pagina Principal');
  
  // is logged ?
  if (!userName) {
    return <WelcomePage />
  }
  
  return (
    <div className='h-full flex flex-col'> 
      
      {/* App bar */}
      <Navbar className='flex justify-between items-center'>
        <HeaderLogo className='text-2xl' redirect/>
        <div 
          ref={profileBtnRef}
          className='text-xl rounded-3xl border border-2 border-current p-2'
          children={<FaUser/>}
          onClick={() => setShowProfileMenu(v => !v)}
        />
        
        {/* Profile menu */}
        <FloatingMenu
          show={showProfileMenu}
          onShow={show => setShowProfileMenu(show)}
          alignRight 
          buttonRef={profileBtnRef}
          children={
            <div className='flex flex-col'>
              <div className='self-end flex items-center'>
                <div className='mr-2 text-body flex flex-col items-end'>
                  <p> example_user </p>
                  <p className='text-sm underline'> 
                    <span className='text-red-900'> SC:</span> 0 
                  </p> 
                </div>
                <div 
                  className='text-4xl self-end text-xl rounded-3xl border border-2 border-current p-2'
                  children={<FaUser/>}
                />
              </div>
              <List
                list={[
                  [<FaUser/>, 'Perfil'],
                  [<FaDollarSign/>, 'Más SproutCoins'],
                  [<FaInfo/>, 'Sobre nosotros...'],
                  [<FaSignOutAlt/>, 'Cerrar sesión'],
                ]}
              />
            </div>
          }
        />
      </Navbar>
      
      {/* body */}
      <div className='p-5 overflow-auto flex-grow'>
        [Home Page]
      </div>
    </div>
  )
} 