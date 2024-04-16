
import { useState, useRef, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { setTitle } from '../utils/title.js'
import { 
  FaArrowRight, 
  FaUser,
  FaInfo,
  FaSignOutAlt,
} from 'react-icons/fa'

import { UserContext } from '../ctx/User.jsx'

import WelcomeView from './Welcome.jsx'
import List from '../ui/List.jsx'
import FloatingMenu from '../ui/FloatingMenu.jsx'
import Navbar from '../shared/Navbar.jsx'
import HeaderLogo from '../shared/HeaderLogo.jsx'

/**
 * Home page
 */
export default function HomeView () {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const profileBtnRef = useRef(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
 
  setTitle('Sproutcomp | Pagina Principal');
  
  // is logged ?
  if (!userCtx.name) {
    return <WelcomeView />
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
                    <span className='text-red-900'> SC:</span> 0 </p> 
                </div>
                <div 
                  className='text-4xl self-end text-xl rounded-3xl border border-2 border-current p-2'
                  children={<FaUser/>}
                />
              </div>
              <List
                list={[
                  [<FaUser/>, 'Perfil'],
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
        [Home View]
      </div>
    </div>
  )
} 