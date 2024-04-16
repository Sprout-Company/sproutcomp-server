
import { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import List from './List.jsx'

import './FloatingMenu.css'

export default function FloatingMenu ({
  list,
  children,
  show, 
  buttonRef,
  alignRight,
  onShow, 
  onClick
}) {
  const nodeRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({left: '0', top: '0'});
  
  useEffect(() => setVisible(show), [show]);
  useEffect(() => {onShow && onShow(visible)}, [visible]);
  
  // set button position
  useEffect(() => {
    const rect = buttonRef.current.getBoundingClientRect();
    const newPos = {top: rect.top + 'px'};
    
    if (alignRight) {
      newPos.right = (innerWidth - rect.right) + 'px';
    }
    else {
      newPos.left = rect.left + 'px'; 
    }
    
    setPosition(newPos);
  }, [buttonRef]);
  
  return (
    <CSSTransition
      in={visible}
      timeout={300}
      classNames='floating-menu'
      unmountOnExit
    > 
      <div 
        ref={nodeRef}
        style={{position: 'fixed', top: 0, left: 0}}
      >
        {/* Shadow */}
        <div 
          className='floating-menu_shadow'
          onClick={() => setVisible(false)}
        />
        
        {/* Menu */}
        <div
          className='floating-menu_dialog p-4 rounded-xl bg-primary shadow-lg'
          style={{
            'position': 'fixed',
            ...position,
          }}
        >
          { 
            children 
            ||
            <List
              list={list}
              onClick={(e) => {
                setVisible(false);
                onClick && onClick(e);
              }}
            />
          }
        </div>
      </div>
    </CSSTransition>
  )
}