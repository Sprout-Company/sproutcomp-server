
import { useState } from 'react'
import { useLocation } from 'wouter'
import { cx } from 'classix'
import { sendRegisterData } from '../logic/auth.js'

import { setTitle } from '@/utils'

import {
  FaAt,
  FaKey,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
  FaHandPointRight,
} from 'react-icons/fa'

import { 
  HeaderLogo
} from '@/shared'

import {
  AuthButton,
  TextField,
  Spinner,
} from '@/ui' 

import bgPrimaryImg from '@/assets/bg-primary.jpg'



/**
 * Login page
 */
export function RegisterPage() {
  const [,navigate] = useLocation();
  const [passVisible, setPassVisible] = useState(false);
  const [rpassVisible, setRpassVisible] = useState(false);
  const [formData, setFormData] = useState({ email: '', pass: '', rpass: '' });
  const [sendingForm, setSendingForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  setTitle('Sproutcomp | Crear Cuenta');

  /**
   * @type {boolean}
   */
  const completedForm = formData.email && formData.pass && formData.rpass;

  /**
   * Submit data
   */
  const submitRegister = () => {
    setSendingForm(true);
    sendRegisterData(formData)
      .then((data) => {
        if (!data.status) return Promise.reject();
        console.log(data)
      })
      .catch((data) => {
        navigate('/');
      })
      .finally(() => setSendingForm(false))
  }

  return (
    <div className="h-full flex flex-col items-center">
      {/* background */}
      <div
        className='z-0 absolute bg-cover bg-center opacity-10 h-full w-full'
        style={{ backgroundImage: `url(${bgPrimaryImg})` }}
      />

      <div className='mt-12 z-1 relative flex flex-col items-center'>
        <HeaderLogo
          className='text-3xl'
          redirect
        />

        {/* Form */}
        <div className='flex flex-col items-center'>
          <h1 className='m-3 text-body font-bold text-xl'> Crear cuenta </h1>

          {errorMessage &&
            <p className='m-2 text-red-600'> {errorMessage} </p>
          }

          {/* Email field */}
          <div className='my-1 w-full'>
            <TextField
              type='email'
              label={<FaAt />}
              value={formData.email}
              onInput={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Password field */}
          <div className='my-1 relative flex items-center w-full'>
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
              onClick={() => {
                setPassVisible(v => !v);
              }}
            />
          </div>

          {/* Password repeat field */}
          <div
            className={cx(
              'my-1 relative flex items-center w-full',
              !formData.pass && 'hidden'
            )}
          >
            <TextField
              type={rpassVisible ? 'text' : 'password'}
              label={<FaKey />}
              placeholder='Repita su contraseña'
              value={formData.rpass}
              onInput={(e) => setFormData({ ...formData, rpass: e.target.value })}
            />
            <div
              className='absolute h-full p-3 text-lg'
              style={{ right: 0, top: 0 }}
              children={!rpassVisible ? <FaEye /> : <FaEyeSlash />}
              onClick={() => {
                setRpassVisible(v => !v);
              }}
            />
          </div>

          {/* Submit */}
          <AuthButton 
            onClick={() => {
              if (sendingForm || !completedForm) return;
              submitRegister();
            }}
            children={
              <div className='flex items-center px-3'>
                {sendingForm && <Spinner />}
                {completedForm ? 'Crear Cuenta' : 'Rellene los campos...'}
              </div>
            }
          />
        </div>

        <div
          className='z-1 relative m-1 p-4 flex items-center underline'
          onClick={() => navigate('/login')}
        >
          <FaHandPointRight />
          <span> No gracias, ya tengo una cuenta </span>
        </div>

        {/* External logins */}
        <div className='mt-5 flex flex-col items-center'>
          <h1 className='m-3 text-lg'> O intenta esto : </h1>
          <div className='w-72 flex flex-row'>
            <AuthButton
              auth='google'
              withoutLabel
              className='text-xs flex-grow justify-center'
            />
          </div>
        </div>

      </div>

    </div>
  )
}