
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setTitle } from '../utils/title.js'

import {
  FaAt, 
  FaKey, 
  FaEye,
  FaEyeSlash,
  FaUserPlus,
  FaHandPointRight,
} from 'react-icons/fa'
import HeaderLogo from '../shared/HeaderLogo.jsx'
import AuthButton from '../ui/AuthButton.jsx'
import TextField from '../ui/TextField.jsx'
import bgPrimaryImg from '../assets/bg-primary.jpg'


/**
 * Login page
 */
export default function RegisterView () {
  const navigate = useNavigate();
  const [passVisible, setPassVisible] = useState(false);
  const [rpassVisible, setRpassVisible] = useState(false);
  const [formData, setFormData] = useState({ email: '', pass: '', rpass: '' });
  
  setTitle('Sproutcomp | Crear Cuenta');
  
  /**
   * @type {boolean}
   */
  const completedForm = formData.email && formData.pass && formData.rpass;
  
  return (
    <div className="h-full flex flex-col items-center"> 
      {/* background */}
      <div 
        className='z-0 absolute bg-cover bg-center opacity-10 h-full w-full'
        style={{backgroundImage: `url(${bgPrimaryImg})`}}
      />
      
      <div className='mt-12 z-1 relative flex flex-col items-center'>
        <HeaderLogo 
          className='text-3xl'
          redirect
        />
        
        {/* Form */}
        <div className='flex flex-col items-center'>
          <h1 className='m-3 text-body font-bold text-xl'> Crear cuenta </h1>
          
          {/* Email field */}
          <div className='my-1 w-full'>
            <TextField 
              type='email'
              label={<FaAt/>} 
              value={formData.email}
              onInput={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          {/* Password field */}
          <div className='my-1 relative flex items-center w-full'> 
            <TextField 
              type={passVisible ? 'text' : 'password'}
              label={<FaKey/>} 
              value={formData.pass}
              onInput={(e) => setFormData({...formData, pass: e.target.value})}
            />
            <div 
              className='absolute h-full p-3 text-lg'
              style={{right:0, top:0}}
              children={!passVisible ? <FaEye/> : <FaEyeSlash/> }
              onClick={() => {
                setPassVisible(v => !v);
              }}
            />
          </div>
          
          {/* Password repeat field */}
          { formData.pass &&
            <div className='my-1 relative flex items-center w-full'> 
              <TextField 
                type={rpassVisible ? 'text' : 'password'}
                label={<FaKey/>} 
                placeholder='Repita su contraseña'
                value={formData.rpass}
                onInput={(e) => setFormData({...formData, rpass: e.target.value})}
              />
              <div 
                className='absolute h-full p-3 text-lg'
                style={{right:0, top:0}}
                children={!rpassVisible ? <FaEye/> : <FaEyeSlash/> }
                onClick={() => {
                  setRpassVisible(v => !v);
                }}
              />
            </div>
          }
          
          {/* Submit */}
          <AuthButton 
            onClick={() => {
              if (!completedForm) return;
              alert('[TODO] Submit');
            }}
            children={
              <div className='px-3'>
                { completedForm ? 'Crear Cuenta' : 'Rellene los campos...'}
              </div>
            }
          />
        </div>
        
        <div 
          className='z-1 relative m-1 p-4 flex items-center underline'
          onClick={() => navigate('/login')}
        >
          <FaHandPointRight/> 
          <span> No gracias, ya tengo una cuenta </span>
        </div>
        
        {/* External logins */}
        <div className='mt-5 flex flex-col items-center'>
          <h1 className='m-3 text-lg'> O intenta esto : </h1>
          <div className='w-72 flex flex-row'>
            { ['google', 'facebook'].map((auth) => 
                <AuthButton 
                  key={auth}
                  auth={auth} 
                  withoutLabel
                  className='text-xs flex-grow justify-center'
                />
              ) 
            } 
          </div>
        </div>
        
      </div>
      
    </div>
  )
}