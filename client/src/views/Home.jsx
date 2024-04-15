
import { useState, useRef, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaArrowRight, FaUser } from 'react-icons/fa'

import { UserContext } from '../ctx/User.jsx'
import WelcomeView from './Welcome.jsx'
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
  
  // is logged ?
  if (!userCtx.name) {
    //return <WelcomeView />
  }
  
  return (
    <div className='h-full flex flex-col'> 
      <Navbar className='flex justify-between items-center'>
        <HeaderLogo className='text-2xl' redirect/>
        <div 
          ref={profileBtnRef}
          className='text-xl rounded-3xl border border-2 border-current p-2'
          children={<FaUser/>}
          onClick={() => setShowProfileMenu(v => !v)}
        />
        <FloatingMenu
          list={[]}
          show={showProfileMenu}
          buttonRef={profileBtnRef}
          onShow={show => setShowProfileMenu(show)}
        />
      </Navbar>
      
      <div className='p-5 overflow-auto flex-grow'>
        [Home View]
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