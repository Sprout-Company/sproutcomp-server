
import googleImg from '@/assets/google-login.png'
import facebookImg from '@/assets/facebook-login.png'

/**
 * Authentication button 
 * @param {'google' | 'facebook'} props.auth - authentication type
 * @param {boolean} props.withoutLabel - hide the label
 */
export function AuthButton({
  auth,
  withoutLabel,
  withoutRedirect,
  className,
  children,
  onClick,
}) {

  let icon = null;
  let handleClick = null;
  let label = null;

  // Google auth
  if (auth === 'google') {
    icon = googleImg;
    label = 'Acceder con Google';
    if (!withoutRedirect) handleClick = () => { location.href = '/auth/google' };
  }

  // Facebook auth
  if (auth === 'facebook') {
    icon = facebookImg;
    label = 'Acceder con Facebook';
    if (!withoutRedirect) handleClick = () => { location.href = '/auth/facebook' };
  }

  return (
    <div
      className={`p-2 m-1 text-lg flex items-center bg-primary rounded-lg shadow ${className}`}
      onClick={onClick || handleClick}
    >
      {icon &&
        <img
          src={icon}
          className='m-4'
          style={{ height: '1.5em' }}
        />
      }
      {!withoutLabel &&
        <div>
          {children || label}
        </div>
      }
    </div>
  )
}