
import { useState } from 'react'
import { useLocation } from 'wouter'
import { cx } from 'classix'

import { setTitle } from '@/utils'

import {
  FaAt,
  FaKey,
  FaUser,
  FaSignInAlt,
  FaHandPointRight,
  FaEye, FaEyeSlash,
} from 'react-icons/fa'

import { 
  HeaderLogo
} from '@/shared'

import {
  AuthButton,
  TextField
} from '@/ui' 

import bgPrimaryImg from '@/assets/bg-primary.jpg'


/**
 * Login page
 */
export function LoginPage () {
  const [location, navigate] = useLocation();
  const [passVisible, setPassVisible] = useState(false);
  const [formData, setFormData] = useState({ email: '', pass: '' });

  setTitle('Sproutcomp | Acceder');

  /**
   * Submit login data
   */
  const submitLogin = async () => {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: formData.email,
        password: formData.pass,
      }),
    });

    if (response.status !== 200) {
      // [TODO] handle status error here...
      console.log(response.status)
      return;
    }

    const data = await response.json();

    console.log(data);
  }

  return (
    <div
      className='relative h-full overflow-auto flex flex-col items-center'
    >
      {/* background */}
      <div
        className='z-0 absolute bg-cover bg-center opacity-10 h-full w-full'
        style={{ backgroundImage: `url(${bgPrimaryImg})` }}
      />

      {/* form */}
      <div className='z-1 mt-12 relative flex flex-col items-center'>
        <HeaderLogo className='text-3xl' redirect />

        <div className='flex flex-col items-center'>
          <h1 className='m-3 font-bold text-lg'> Iniciar sesión </h1>

          {/* Email field */}
          <div className='my-1 w-full'>
            <TextField
              type='email'
              label={<FaAt />}
              value={formData.email}
              placeholder='Ingresa tu email'
              onInput={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Password field */}
          <div
            className={cx(
              'my-1 relative flex items-center w-full',
              !formData.email && 'hidden'
            )}
          >
            <TextField
              type={passVisible ? 'text' : 'password'}
              label={<FaKey />}
              value={formData.pass}
              onInput={(e) => setFormData({ ...formData, pass: e.target.value })}
            />
            <div
              className='absolute h-full p-3 text-lg'
              style={{ right: 0, top: 0 }}
              children={!passVisible ? <FaEye /> : <FaEyeSlash />}
              onClick={() => setPassVisible(v => !v)}
            />
          </div>

          {/* Submit */}
          <AuthButton
            className={cx(
              'self-end', 
              !formData.email && 'hidden'
            )}
            children={
              <div className='flex items-center'>
                <FaSignInAlt />
                <span className='ml-2'>
                  <span className='text-red-900'>A</span>cceder
                </span>
              </div>
            }
            onClick={() => {
              if (!formData.email || !formData.pass) return;
              submitLogin();
            }}
          />
        </div>

        <div
          className='z-1 relative m-4 p-4 flex items-center underline'
          onClick={() => navigate('/register')}
        >
          <FaHandPointRight />
          Oops ! No tengo una cuenta
        </div>

        {/* External logins */}
        <div className='mt-12 flex flex-col items-center'>
          <h1> O utiliza: </h1>
          <AuthButton auth='google' className='self-stretch' />
        </div>
      </div>
    </div>
  )
}