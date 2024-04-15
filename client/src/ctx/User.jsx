
import { useState, createContext } from 'react'

// context
export const UserContext = createContext();

/**
 * Provide current user
 */
export const UserProvider = ({children}) => {
  const [name, setName] = useState('');
  
  const context = {
    name,
    setName,
  };
  return (
    <UserContext.Provider
      value={context}
      children={children}
    />
  )
}
