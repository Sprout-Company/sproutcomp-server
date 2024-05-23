

import axios from 'redaxios'

/**
 * Login the user
 */
export const sendLoginData = ({email, pass}) => {
  return axios('/auth/login', {
    method: 'POST',
    data: {
      username: email.split('@')[0],
      password: pass,
    }
  })
}

/**
 * Register new user
 */
export const sendRegisterData = ({email, pass, rpass}) => {
  return axios('/auth/login', {
    method: 'POST',
    data: {
      username: email.split('@')[0],
      email: email,
      password: pass,
      repassword: rpass,
    }
  });
}