
import googleImg from '../assets/google-login.png'
import facebookImg from '../assets/facebook-login.png'

/**
 * Authentication button 
 * @param {'google' | 'facebook'} props.type - authentication type
 */
export default function AuthButton ({
    children,
    className,
    type,
    onClick,
}) {
    
    let icon = null;
    let handleClick = null;
    let label = null;
    
    // Google auth
    if (type === 'google') {
        icon = googleImg;
        label = 'Acceder con Google';
        handleClick = () => {location.href = '/auth/google'};
    }
    
    // Facebook auth
    if (type === 'facebook') {
        icon = facebookImg;
        label = 'Acceder con Facebook';
        handleClick = () => {location.href = '/auth/facebook'};
    }
    
    return (
        <div 
            className={`${className} flex items-center bg-primary rounded-lg w-72 p-2 m-1 shadow`}
            onClick={onClick || handleClick}
        >
            {icon && <img src={icon} className='h-6 m-4'/>}
            <div className='text-lg text-primart'>
                { children || label }
            </div>
        </div>
    )
}